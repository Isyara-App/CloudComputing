const { pool } = require('../database');
const Joi = require('joi');

const communitySchema = Joi.object({
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

const getAllCommunities = async (request, h) => {
    const query = 'SELECT * FROM community';
    const [result] = await pool.query(query);

    if (result.length === 0) {
        const response = h.response({
            status: 'fail',
            message: 'No communities found'
        });
        response.code(404);
        return response;
    }

    const response = h.response({
        status: 'success',
        message: 'Communities retrieved successfully',
        data: result
    });
    response.code(200);
    return response;
};

const getCommunityById = async (request, h) => {
    const { id } = request.params;
    const [result] = await pool.query(
        'SELECT * FROM community WHERE id = ?', 
        [id]
    );

    if (result.length === 0) {
        const response = h.response({
            status: 'fail',
            message: 'Community not found'
        });
        response.code(404);
        return response;
    }

    const response = h.response({
        status: 'success',
        message: 'Community retrieved successfully',
        data: result[0]
    });
    response.code(200);
    return response;
};

const createCommunity = async (request, h) => {
    const payload = request.payload || {};
    const { error } = communitySchema.validate(payload);

    if (error) {
        const response = h.response({
            status: 'fail',
            message: error.details[0].message,
        });
        response.code(400);
        return response;
    }

    const { title, image_url, description } = payload;

    const [result] = await pool.query(
        'INSERT INTO community (title, image_url, description) VALUES (?, ?, ?)', 
        [title, image_url, description]
    );

    const [newData] = await pool.query(
        'SELECT * FROM community WHERE id = ?', 
        [result.insertId]
    );

    const response = h.response({
        status: 'success',
        message: 'New community added successfully',
        data: newData[0]
    });
    response.code(201);
    return response;
};

const updateCommunity = async (request, h) => {
    const payload = request.payload || {};
    const { id } = request.params;
    const { error } = communitySchema.validate(payload);

    if (error) {
        const response = h.response({
            status: 'fail',
            message: error.details[0].message,
        });
        response.code(400);
        return response;
    }

    const { title, image_url, description } = payload;

    const [result] = await pool.query(
        'UPDATE community SET title = ?, image_url = ?, description = ? WHERE id = ?', 
        [title, image_url, description, id]
    );

    if (result.affectedRows === 0) {
        const response = h.response({
            status: 'fail',
            message: 'Community not found'
        });
        response.code(404);
        return response;
    }

    const [updatedData] = await pool.query(
        'SELECT * FROM community WHERE id = ?', 
        [id]
    );

    const response = h.response({
        status: 'success',
        message: 'Community updated successfully',
        data: updatedData[0]
    });
    response.code(200);
    return response;
};

const deleteCommunity = async (request, h) => {
    const { id } = request.params;

    const [community] = await pool.query(
        'SELECT * FROM community WHERE id = ?', 
        [id]);

    if (community.length === 0) {
        const response = h.response({
            status: 'fail',
            message: 'Community not found',
        });
        response.code(404);
        return response;
    }

    await pool.query(
        'DELETE FROM community WHERE id = ?', 
        [id]);

    const response = h.response({
        status: 'success',
        message: 'Community deleted successfully',
        data: community[0],
    });
    response.code(200);
    return response;
};

module.exports = { getAllCommunities, getCommunityById, createCommunity, updateCommunity, deleteCommunity };