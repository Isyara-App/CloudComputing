const { pool } = require('../app/database');
const Boom = require('@hapi/boom');

const getAllWords = async (request, h) => {
    const { search } = request.query;
    let query = 'SELECT * FROM kamus_kata';
    const params = [];

    if (search) {
        query += ' WHERE kata LIKE ?';
        params.push(`%${search}%`);
    }

    const [result] = await pool.query(query, params);

    if (result.length === 0) {
        throw Boom.notFound('No data found / No data found for the specified search');
    }

    const response = h.response({
        status: 'success',
        message: 'Words retrieved successfully',
        data: result
    });
    response.code(200);
    return response;
};

const getWordById = async (request, h) => {
    const { id } = request.params;
    const [result] = await pool.query(
        'SELECT * FROM kamus_kata WHERE id = ?', 
        [id]
    );

    if (result.length === 0) {
        throw Boom.notFound('Word not found');
    }

    const response = h.response({
        status: 'success',
        message: 'Word retrieved successfully',
        data: result[0]
    });
    response.code(200);
    return response;
};

const createWord = async (request, h) => {
    const payload = request.payload || {};
    const { image_url, kata } = payload;

    if (!image_url || !kata) {
        throw Boom.badRequest(`Image url and word can't be blank`);
    }

    const [existingWord] = await pool.query(
        'SELECT * FROM kamus_kata WHERE kata = ?', 
        [kata]
    );

    if (existingWord.length > 0) {
        throw Boom.badRequest('A word with that value already exists');
    }

    const [result] = await pool.query(
        'INSERT INTO kamus_kata (image_url, kata) VALUES (?, ?)', 
        [image_url, kata]
    );

    const [newData] = await pool.query(
        'SELECT * FROM kamus_kata WHERE id = ?', 
        [result.insertId]
    );

    const response = h.response({
        status: 'success',
        message: 'Word added successfully',
        data: newData[0]
    });
    response.code(201);
    return response;
};

const updateWord = async (request, h) => {
    const payload = request.payload || {};
    const { id } = request.params;
    const { image_url, kata } = payload;

    if (!image_url || !kata) {
        throw Boom.badRequest(`Image url and word can't be blank`);
    }

    const [result] = await pool.query(
        'UPDATE kamus_kata SET image_url = ?, kata = ? WHERE id = ?', 
        [image_url, kata, id]
    );

    if (result.affectedRows === 0) {
        throw Boom.notFound('Word not found');
    }

    const [updatedData] = await pool.query(
        'SELECT * FROM kamus_kata WHERE id = ?', 
        [id]
    );

    const response = h.response({
        status: 'success',
        message: 'Word updated successfully',
        data: updatedData[0]
    });
    response.code(200);
    return response;
};

const deleteWord = async (request, h) => {
    const { id } = request.params;
    const [result] = await pool.query(
        'DELETE FROM kamus_kata WHERE id = ?',
        [id]
    );

    if (result.affectedRows === 0) {
        throw Boom.notFound('Word not found');
    }

    const response = h.response({
        status: 'success',
        message: 'Word deleted successfully'
    });
    response.code(200);
    return response;
};

module.exports = { getAllWords, getWordById, createWord, updateWord, deleteWord };