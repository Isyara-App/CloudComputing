const { pool } = require('../database');
const Boom = require('@hapi/boom');

const userLogout = async (request, h) => {
    try {
        const token = request.headers.authorization.split(' ')[1];
        await pool.query('INSERT INTO tokens (token, user_id) VALUES (?, ?)', [token, request.user.id]);
        return h.response({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        throw Boom.internal('Logout failed', error);
    }
};

module.exports = { userLogout };

