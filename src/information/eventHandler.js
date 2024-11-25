const { pool } = require('../app/database');
const Joi = require('joi');
const Boom = require('@hapi/boom');

const eventSchema = Joi.object({
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

const getAllEvents = async (request, h) => {
    const query = 'SELECT * FROM events';
    const [result] = await pool.query(query);

    if (result.length === 0) {
        throw Boom.notFound('No events found');
    }

    const response = h.response({
        status: 'success',
        message: 'Events retrieved successfully',
        data: result
    });
    response.code(200);
    return response;
};

const getEventById = async (request, h) => {
    const { id } = request.params;
    const [result] = await pool.query(
        'SELECT * FROM events WHERE id = ?', 
        [id]
    );

    if (result.length === 0) {
        throw Boom.notFound('Event not found');
    }

    const response = h.response({
        status: 'success',
        message: 'Event retrieved successfully',
        data: result[0]
    });
    response.code(200);
    return response;
};

const createEvent = async (request, h) => {
    const payload = request.payload || {};
    const { error } = eventSchema.validate(payload);

    if (error) {
        throw Boom.badRequest(error.details[0].message);
    }

    const { title, image_url, description } = payload;

    const [result] = await pool.query(
        'INSERT INTO events (title, image_url, description) VALUES (?, ?, ?)', 
        [title, image_url, description]
    );

    const [newData] = await pool.query(
        'SELECT * FROM events WHERE id = ?', 
        [result.insertId]
    );

    const response = h.response({
        status: 'success',
        message: 'New event added successfully',
        data: newData[0]
    });
    response.code(201);
    return response;
};

const updateEvent = async (request, h) => {
    const payload = request.payload || {};
    const { id } = request.params;
    const { error } = eventSchema.validate(payload);

    if (error) {
        throw Boom.badRequest(error.details[0].message);
    }

    const { title, image_url, description } = payload;

    const [result] = await pool.query(
        'UPDATE events SET title = ?, image_url = ?, description = ? WHERE id = ?', 
        [title, image_url, description, id]
    );

    if (result.affectedRows === 0) {
        throw Boom.notFound('Event not found');
    }

    const [updatedData] = await pool.query(
        'SELECT * FROM events WHERE id = ?', 
        [id]
    );

    const response = h.response({
        status: 'success',
        message: 'Event updated successfully',
        data: updatedData[0]
    });
    response.code(200);
    return response;
};

const deleteEvent = async (request, h) => {
    const { id } = request.params;

    const [event] = await pool.query(
        'SELECT * FROM events WHERE id = ?', 
        [id]);

    if (event.length === 0) {
        throw Boom.notFound('Event not found');
    }

    await pool.query(
        'DELETE FROM events WHERE id = ?', 
        [id]);

    const response = h.response({
        status: 'success',
        message: 'Event deleted successfully',
        data: event[0],
    });
    response.code(200);
    return response;
};

module.exports = { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };