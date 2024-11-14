const { nanoid } = require('nanoid');
const users = require('./users');
const { generateToken } = require('./token');
const bcrypt = require('bcrypt');
const pool = require('../database');

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

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        const response = h.response({
            status: 'fail',
            message: 'User already exists',
        });
        response.code(409);
        return response;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = nanoid(16);

    users.push({ id, name, email, password: hashedPassword });

    const response = h.response({
        status: 'success',
        message: 'User registered successfully',
    });
    response.code(201);
    return response;
};

const loginUser = async (request, h) => {
    const { email, password } = request.payload;

    if (!email || !password) {
        const response = h.response({
            status: 'fail',
            message: 'Email and password are required',
        });
        response.code(400);
        return response;
    }

    const user = users.find(u => u.email === email);
    if (!user) {
        const response = h.response({
            status: 'fail',
            message: 'Account does not exist',
        });
        response.code(401);
        return response;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        const response = h.response({
            status: 'fail',
            message: 'Password is incorrect',
        });
        response.code(401);
        return response;
    }

    const token = generateToken({ email: user.email, id: user.id });

    const response = h.response({
        status: 'success',
        message: 'Login successful',
        data: {
            email: user.email,
            id: user.id,
            token
        }
    });
    response.code(200);
    return response;
};

module.exports = { registerUser, loginUser };