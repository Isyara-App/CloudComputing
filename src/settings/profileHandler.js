const { pool } = require('../database');
const Boom = require('@hapi/boom');
const pictureUpload = require('./pictureHandler');

const updateProfile = async (request, h) => {
    const payload = request.payload || {};
    const { id } = request.params;
    const { name, image, deleteImage } = payload;

    try {
        let imageUrl = null;

        if (deleteImage) {
            const resetResult = await pictureUpload.deleteProfilePicture(id);
            imageUrl = resetResult.message.includes('default') ? 'https://example.com/default.png' : null;
        } else if (image) {
            console.log('Uploading new image to GCS...');
            imageUrl = await pictureUpload.uploadToGCS(request, h); // Ensure uploadToGCS works correctly
            console.log('Image uploaded. URL:', imageUrl);
        }

        const query = [];
        const values = [];
        if (name) {
            query.push('name = ?');
            values.push(name);
        }
        if (imageUrl) {
            query.push('image_url = ?');
            values.push(imageUrl);
        }

        if (query.length === 0) {
            throw Boom.badRequest('No changes to update');
        }

        values.push(id);

        console.log('Updating database with values:', values);

        const [result] = await pool.query(
            `UPDATE users SET ${query.join(', ')} WHERE id = ?`,
            values
        );

        if (result.affectedRows === 0) {
            throw Boom.notFound('User not found');
        }

        const response = h.response({
            status: 'success',
            message: 'Profile updated successfully',
            data: {
                name: name || null,
                image_url: imageUrl || null,
            },
        });
        response.code(200);
        return response;
    } catch (error) {
        console.error('Error in updateProfile:', error);
        throw Boom.internal('Failed to update profile', error);
    }
};

const deleteProfilePicture = async (request, h) => {
    const { id } = request.params;

    try {
        const result = await pictureUpload.deleteProfilePicture(id);

        const response = h.response(result);
        response.code(200);
        return response;
    } catch (error) {
        throw Boom.internal('Failed to delete profile picture', error);
    }
};

module.exports = { updateProfile, deleteProfilePicture };