const { pool } = require('../database');
const Boom = require('@hapi/boom');
const pictureUpload = require('../profile/pictureUpload');

const updateProfilePicture = async (request, h) => {
    const file = request.payload.image;

    if (!file) {
        throw Boom.badRequest('Unsuccessful to update profile picture. Please attach a picture');
    }

    // Call the uploadToGCS function from pictureUpload.js
    try {
        const response = await pictureUpload.uploadToGCS(request, h);
        return response;
    } catch (error) {
        throw Boom.internal('Failed to update profile', error);
    }
}

const updateUsername = async (request, h) => {
    const payload = request.payload || {};
    const { id } = request.params;
    const { name } = payload;

    if (!name) {
        throw Boom.badRequest("Failed to update username. Username can't be blank");
    }

    const [result] = await pool.query(
        'UPDATE users SET name = ? WHERE id = ?',
        [name, id]
    )

    if (result.affectedRows == 0) {
        throw Boom.notFound('User not found');
    }

    const response = h.response({
        status: 'success',
        message: `'Username updated successfully. Your new username is: ${name}`,
    });
    response.code(200);
    return response;
}

module.exports = { updateProfilePicture, updateUsername };