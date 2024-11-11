require('dotenv').config();
const jwt = require('jsonwebtoken');

const generateToken = (userData) => {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        throw new Error('secret key is not defined');
    }
    return jwt.sign(userData, secretKey, { expiresIn: '1h' });
};

module.exports = { generateToken };