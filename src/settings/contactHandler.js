const { pool } = require('../database');
const Boom = require('@hapi/boom');

const createContactMessage = async (request, h) => {
    const { name, email, message } = request.payload;

    if (!name || !email || !message) {
        throw Boom.badRequest(`Name, email, and message can' be blank`);
    }

    const [result] = await pool.query(
        'INSERT INTO contact_us (name, email, message) VALUES (?, ?, ?)',
        [name, email, message]
    );

    const response = h.response({
        status: 'success',
        message: 'Your message has been sent successfully',
        data: {
            id: result.insertId,
            name,
            email,
            message,
        },
    });
    response.code(201);
    return response;
}

module.exports = { createContactMessage };