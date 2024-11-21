const { pool } = require('../database');
const Boom = require('@hapi/boom');
const jwt = require('../auth/token');

const validateToken = async (request, h) => {
    try {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            throw Boom.unauthorized('Authorization header is missing');
        }

        // Format: Bearer <token>
        const token = authHeader.split(' ')[1]; 

        if (!token) {
            throw Boom.unauthorized('Token is missing');
        }

        // Cek apakah token sudah di-blacklist
        const [rows] = await pool.query('SELECT * FROM tokens WHERE token = ?', [token]);
        if (rows.length > 0) {
            throw Boom.unauthorized('Token has been invalidated');
        }

        // Verifikasi token JWT
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        // Attach decoded user info to request
        request.user = decoded;

        return h.continue;
    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            throw Boom.unauthorized('Invalid or expired token');
        }

        console.error('Token validation error:', error.message);
        throw Boom.internal('Token validation failed', error);
    }
};

module.exports = { validateToken };

