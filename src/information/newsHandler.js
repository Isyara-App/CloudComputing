const { pool } = require('../database');
const Joi = require('joi');
const Boom = require('@hapi/boom');

const newsSchema = Joi.object({
    title: Joi.string().min(5).required().messages({
        'string.min': 'Title must be at least 5 characters',
        'any.required': 'Title is required',
    }),
    image_url: Joi.string().uri().required().messages({
        'string.uri': 'Image URL must be a valid URI',
        'any.required': 'Image URL is required',
    }),
    description: Joi.string().min(10).required().messages({
        'string.min': 'Description must be at least 10 characters',
        'any.required': 'Description is required',
    }),
});

const getAllNews = async (request, h) => {
    const query = 'SELECT * FROM news';
    const [result] = await pool.query(query);

    if (result.length === 0) {
        throw Boom.notFound('No news found');
    }

    const response = h.response({
        status: 'success',
        message: 'News retrieved successfully',
        data: result
    });
    response.code(200);
    return response;
};

const getNewsById = async (request, h) => {
    const { id } = request.params;
    const [result] = await pool.query(
        'SELECT * FROM news WHERE id = ?', 
        [id]
    );

    if (result.length === 0) {
        throw Boom.notFound('News not found');
    }

    const response = h.response({
        status: 'success',
        message: 'News retrieved successfully',
        data: result[0]
    });
    response.code(200);
    return response;
};

const createNews = async (request, h) => {
    const payload = request.payload || {};
    const { error } = newsSchema.validate(payload);

    if (error) {
        throw Boom.badRequest(error.details[0].message);
    }

    const { title, image_url, description } = payload;

    const [result] = await pool.query(
        'INSERT INTO news (title, image_url, description) VALUES (?, ?, ?)', 
        [title, image_url, description]
    );

    const [newData] = await pool.query(
        'SELECT * FROM news WHERE id = ?', 
        [result.insertId]
    );

    const response = h.response({
        status: 'success',
        message: 'New news added successfully',
        data: newData[0]
    });
    response.code(201);
    return response;
};

const updateNews = async (request, h) => {
    const payload = request.payload || {};
    const { id } = request.params;
    const { error } = newsSchema.validate(payload);

    if (error) {
        throw Boom.badRequest(error.details[0].message);
    }

    const { title, image_url, description } = payload;

    const [result] = await pool.query(
        'UPDATE news SET title = ?, image_url = ?, description = ? WHERE id = ?', 
        [title, image_url, description, id]
    );

    if (result.affectedRows === 0) {
        throw Boom.notFound('News not found');
    }

    const [updatedData] = await pool.query(
        'SELECT * FROM news WHERE id = ?', 
        [id]
    );

    const response = h.response({
        status: 'success',
        message: 'News updated successfully',
        data: updatedData[0]
    });
    response.code(200);
    return response;
};

const deleteNews = async (request, h) => {
    const { id } = request.params;

    const [news] = await pool.query(
        'SELECT * FROM news WHERE id = ?', 
        [id]);

    if (news.length === 0) {
        throw Boom.notFound('News not found');
    }

    await pool.query(
        'DELETE FROM news WHERE id = ?', 
        [id]);

    const response = h.response({
        status: 'success',
        message: 'News deleted successfully',
        data: news[0],
    });
    response.code(200);
    return response;
};

module.exports = { getAllNews, getNewsById, createNews, updateNews, deleteNews };