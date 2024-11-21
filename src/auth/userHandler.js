const { generateToken } = require('./token');
const bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');
const { pool } = require('../database');

const registerUser = async (request, h) => {
    const { name, email, password } = request.payload;

    if (!name || !email || !password) {
        throw Boom.badRequest('All fields are required');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
        throw Boom.badRequest('Email already existed');
    } else {
        const [result] = await pool.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        const [newData] = await pool.query(
            'SELECT * FROM users WHERE id = ?',
            [result.insertId]
        );

        const token = generateToken({ email: newData.email, id: newData.id });

        const response = h.response({
            status: 'success',
            message: 'User registered successfully',
            data: newData[0],
            token
        });
        response.code(201);
        return response;
    }
};

const loginUser = async (request, h) => {
    const { email, password } = request.payload;

    if (!email || !password) {
        throw Boom.badRequest('Please fill all the required fields');
    }

    const [existingEmail] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (!existingEmail.length) {
        throw Boom.badRequest('Email not found');
    }

    const userData = existingEmail[0];
    const hashedPassword = userData.password;

    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordValid) {
        throw Boom.badRequest('Password is incorrect');
    }

    const token = generateToken({ email: userData.email, id: userData.id });

    const response = h.response({
        status: 'success',
        message: 'Login successfully',
        data: {
            name: userData.name,
            email: userData.email,
        },
        token
    });
    response.code(201);
    return response;

}

module.exports = { registerUser, loginUser };