const { generateToken } = require('./token');
const bcrypt = require('bcrypt');
const Boom = require('@hapi/boom');
const { pool } = require('../database');

const registerUser = async (request, h) => {
    const { name, email, password } = request.payload;

    if (!name || !email || !password) {
        const response = h.response({
            status: 'fail',
            message: 'All fields are required',
        });
        response.code(400);
        return response;
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

        const response = h.response({
            status: 'success',
            message: 'User registered successfully',
            data: newData[0]
        });
        response.code(201);
        return response;
    }
};

const loginUser = async (request, h) => {
    const { email, password } = request.payload;

    if (!email || !password) {
        const response = h.response({
            status: 'fail',
            message: 'Please fill all the required fields',
        });
        response.code(400);
        return response;
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