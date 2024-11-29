const { pool } = require('../app/database');
const Boom = require('@hapi/boom');

const createProfilePic = async (request, h) => {
    const payload = request.payload || {};
    const image_url = payload;

    if (!image_url) {
        throw Boom.badRequest(`Image url can't be blank`);
    }

    const [result] = await pool.query(
        'INSERT INTO profile (image_url) VALUES (?)',
        [image_url]
    );

    if (result.affectedRows === 0) {
        throw Boom.notFound('Profile not found');
    }

    const [newImage] = await pool.query(
        'SELECT * FROM profile WHERE id = ?',
        [result.insertId]
    );

    const response = h.response({
        status: 'success',
        message: 'Profile picture added successfully',
        data: newImage[0]
    });
    response.code(201);
    return response;
};

const updateProiflePic = async (request, h) => {
    const payload = request.payload || {};
    const { id } = request.params;
    const image_url = payload;

    if (!image_url) {
        throw Boom.badRequest(`Image url can't be blank`);
    }

    const [result] = await pool.query(
        'UPDATE profile SET image_url = ?, WHERE id = ?',
        [image_url, id]
    );

    if (result.affectedRows === 0) {
        throw Boom.notFound('Profile not found');
    }

    const [updatedData] = await pool.query(
        'SELECT * FROM profile WHERE id = ?',
        [id]
    );

    const response = h.response({
        status: 'success',
        message: 'Profile picture updated successfully',
        data: updatedData[0]
    });
    response.code(200);
    return response;
};

module.exports= { createProfilePic, updateProiflePic };

