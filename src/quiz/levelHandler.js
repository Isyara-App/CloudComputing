const { pool } = require('../database');
const Boom = require('@hapi/boom');

const getAllLevels = async (request, h) => {
    const [result] = await pool.query(
        "SELECT * FROM levels"
    );

    if (result.length === 0) {
        throw Boom.notFound('Levels not found');
    }

    const response = h.response({
        status: 'success',
        message: 'Levels retrieved successfully',
        data: result
    });
    response.code(200);
    return response;
};

const getLevelById = async (request, h) => {
    const { levelId } = request.params;
    const userId = request.user.id; 

    const [levelResult] = await pool.query(
        'SELECT * FROM levels WHERE id = ?', 
        [levelId]
    );
    if (levelResult.length === 0) {
        throw Boom.notFound('Level not found');
    }

    if (levelId > 1) {
        const previousLevelId = levelId - 1;

        const [progressResult] = await pool.query(
            'SELECT status FROM user_progress WHERE user_id = ? AND level_id = ?',
            [userId, previousLevelId]
        );

        if (progressResult.length === 0 || progressResult[0].status !== 'completed') {
            throw Boom.forbidden(`You must complete level ${previousLevelId} before accessing this level.`);
        }
    }

    const response = h.response({
        status: 'success',
        message: 'Level retrieved successfully',
        data: levelResult[0]
    });
    response.code(200);
    return response;
};

const createLevel = async (request, h) => {
    const payload = request.payload || {};
    const { name, title, description, image_url } = payload;

    if (!name || !title || !description || !image_url) {
        throw Boom.badRequest(`Name, title, description, and image_url can't be blank`);
    }

    const [result] = await pool.query(
        "INSERT INTO levels (name, title, description, image_url) VALUES (?, ?, ?, ?)",
        [name, title, description, image_url]
    );

    const [newData] = await pool.query(
        'SELECT * FROM levels WHERE id = ?',
        [result.insertId]
    );

    const response = h.response({
        status: 'success',
        message: 'Level created successfully',
        data: newData[0]
    });
    response.code(201);
    return response;
};

const updateLevel = async (request, h) => {
    const { levelId } = request.params;
    const { name, title, description, image_url } = request.payload;

    if (!name || !title || !description || !image_url) {
        throw Boom.badRequest(`Name, title, description, and image_url can't be blank`);
    }

    const [result] = await pool.query(
        'UPDATE levels SET name = ?, title = ?, description = ?, image_url = ? WHERE id = ?',
        [name, title, description, image_url, levelId]
    );

    if (result.affectedRows === 0) {
        throw Boom.notFound('Level not found');
    }

    const [updatedData] = await pool.query(
        'SELECT * FROM levels WHERE id = ?',
        [levelId]
    );

    const response = h.response({
        status: 'success',
        message: 'Level updated successfully',
        data: updatedData[0]
    });
    response.code(200);
    return response;
};

const deleteLevel = async (request, h) => {
    const { levelId } = request.params;
    const [result] = await pool.query(
        'DELETE FROM levels WHERE id = ?', 
        [levelId]
    );

    if (result.affectedRows === 0) {
        throw Boom.notFound('Level not found');
    }

    const response = h.response({
        status: 'success',
        message: 'Level deleted successfully'
    });
    response.code(200);
    return response;
};

module.exports = {
    getAllLevels, getLevelById, createLevel, updateLevel, deleteLevel
};