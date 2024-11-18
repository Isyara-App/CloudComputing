const { pool } = require('../database');
const Boom = require('@hapi/boom');

const getAllLetters = async (request, h) => {
    const { search } = request.query;
    let query = 'SELECT * FROM kamus_huruf';
    const params = [];

    if (search) {
        query += ' WHERE huruf LIKE ?';
        params.push(`%${search}%`);
    }

    const [result] = await pool.query(query, params);
    if (result.length === 0) {
        throw Boom.notFound('No data found / No data found for the specified search');
    }

    const response = h.response({
        status: 'success',
        message: 'Letters retrieved successfully',
        data: result
    });
    response.code(200);
    return response;
};

const getLetterById = async (request, h) => {
    const { id } = request.params;
    const [result] = await pool.query(
        'SELECT * FROM kamus_huruf WHERE id = ?',
        [id]
    );

    if (result.length === 0) {
        throw Boom.notFound('Letter not found');
    }

    const response = h.response({
        status: 'success',
        message: 'Letter retrieved successfully',
        data: result[0]
    });
    response.code(200);
    return response;
};

const createLetter = async (request, h) => {
    const payload = request.payload || {};
    const { image_url, huruf } = payload;

    if (!image_url || !huruf) {
        throw Boom.badRequest(`Image url and letter can't be blank`);
    }

    const [existingLetter] = await pool.query(
        'SELECT * FROM kamus_huruf WHERE huruf = ?',
        [huruf]
    );

    if (existingLetter.length > 0) {
        throw Boom.badRequest('A data with that letter already exists');
    }

    const [result] = await pool.query(
        'INSERT INTO kamus_huruf (image_url, huruf) VALUES (?, ?)', 
        [image_url, huruf]
    );

    const [newData] = await pool.query(
        'SELECT * FROM kamus_huruf WHERE id = ?',
        [result.insertId]
    );

    const response = h.response({
        status: 'success',
        message: 'Letter added successfully',
        data: newData[0]
    });
    response.code(201);
    return response;
};

const updateLetter = async (request, h) => {
    const payload = request.payload || {};
    const { id } = request.params;
    const { image_url, huruf } = payload;

    if (!image_url || !huruf) {
        throw Boom.badRequest(`Image url and letter can't be blank`);
    }

    const [result] = await pool.query(
        'UPDATE kamus_huruf SET image_url = ?, huruf = ? WHERE id = ?',
        [image_url, huruf, id]
    );

    if (result.affectedRows === 0) {
        throw Boom.notFound('Letter not found');
    }

    const [updatedData] = await pool.query(
        'SELECT * FROM kamus_huruf WHERE id = ?',
        [id]
    );

    const response = h.response({
        status: 'success',
        message: 'Letter updated successfully',
        data: updatedData[0]
    });
    response.code(200);
    return response;
};

const deleteLetter = async (request, h) => {
    const { id } = request.params;
    const [result] = await pool.query(
        'DELETE FROM kamus_huruf WHERE id = ?',
        [id]
    );

    if (result.affectedRows === 0) {
        throw Boom.notFound('Letter not found');
    }

    const response = h.response({
        status: 'success',
        message: 'Letter deleted successfully'
    });
    response.code(200);
    return response;
};

module.exports = { getAllLetters, getLetterById, createLetter, updateLetter, deleteLetter };