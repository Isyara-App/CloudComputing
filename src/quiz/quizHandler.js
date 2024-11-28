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

    const [levelResult] = await pool.query('SELECT * FROM levels WHERE id = ?', [levelId]);
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
    const { name } = payload;

    if (!name) {
        throw Boom.badRequest(`Name can't be blank`);
    }

    const [result] = await pool.query(
        "INSERT INTO levels (name) VALUES (?)",
        [name]
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
    const { name } = request.payload;

    if (!name) {
        throw Boom.badRequest(`Name can't be blank`);
    }

    const [result] = await pool.query(
        'UPDATE levels SET name = ? WHERE id = ?',
        [name, levelId]
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


const getAllQuestions = async (request, h) => {
    const { levelId } = request.params;

    const [result] = await pool.query(
        "SELECT * FROM questions WHERE level_id = ?",
        [levelId]
    );

    if (result.length === 0) {
        throw Boom.notFound('Questions not found');
    }

    const question = result.map((question) => ({
        ...question,
        options: JSON.parse(question.options)
    }));

    const response = h.response({
        status: 'success',
        message: 'Questions retrieved successfully',
        data: question
    });
    response.code(200);
    return response;
};

const getQuestionById = async (request, h) => {
    const { questionId } = request.params;

    const [result] = await pool.query(
        'SELECT * FROM questions WHERE id = ?',
        [questionId]
    );

    if (result.length === 0) {
        throw Boom.notFound('Question not found');
    }

    const question = result.map((question) => ({
        ...question,
        options: JSON.parse(question.options) 
    }));

    const response = h.response({
        status: 'success',
        message: 'Question retrieved successfully',
        data: question
    });
    response.code(200);
    return response;
};

const createQuestion = async (request, h) => {
    const payload = request.payload || {};
    const { levelId } = request.params;
    const { question, correct_option, options } = payload;

    if (!question || !correct_option || !options) {
        throw Boom.badRequest('Please fill all the required fields');
    }

    const [result] = await pool.query(
        "INSERT INTO questions (level_id, question, correct_option, options) VALUES (?, ?, ?, ?)",
        [levelId, question, correct_option, JSON.stringify(options)]
    );

    const [newData] = await pool.query(
        'SELECT * FROM questions WHERE id = ?',
        [result.insertId]
    );

    const response = h.response({
        status: 'success',
        message: 'Question created successfully',
        data: newData[0]
    });
    response.code(201);
    return response;
};

const updateQuestion = async (request, h) => {
    const { questionId } = request.params;
    const { question, correct_option, options } = request.payload;

    if (!question || !correct_option || !options) {
        throw Boom.badRequest('All fields are required');
    }

    const [result] = await pool.query(
        'UPDATE questions SET question = ?, correct_option = ?, options = ? WHERE id = ?',
        [question, correct_option, JSON.stringify(options), questionId]
    );

    if (result.affectedRows === 0) {
        throw Boom.notFound('Question not found');
    }

    const [updatedData] = await pool.query(
        'SELECT * FROM questions WHERE id = ?',
        [questionId]
    );
    const response = h.response({
        status: 'success',
        message: 'Question updated successfully',
        data: updatedData[0]
    });
    response.code(200);
    return response;
};

const deleteQuestion = async (request, h) => {
    const { questionId } = request.params;
    const [result] = await pool.query(
        'DELETE FROM questions WHERE id = ?',
        [questionId]
    );

    if (result.affectedRows === 0) {
        throw Boom.notFound('Question not found');
    }

    const response = h.response({
        status: 'success',
        message: 'Question deleted successfully'
    });
    response.code(200);
    return response;
};


const checkAnswer = async (request, h) => {
    const payload = request.payload || {};
    const { questionId } = request.params;
    const { selected_option } = payload;

    const userId = request.user?.id;
    if (!userId) {
        throw Boom.unauthorized('User not authenticated');
    }

    const [questionResult] = await pool.query(
        "SELECT level_id, correct_option FROM questions WHERE id = ?",
        [questionId]
    );

    if (questionResult.length === 0) {
        throw Boom.notFound('Question not found');
    }

    const { level_id: levelId, correct_option: correctOption } = questionResult[0];
    const isCorrect = correctOption === selected_option;

    if (isCorrect) {
        const [questions] = await pool.query(
            "SELECT id FROM questions WHERE level_id = ?",
            [levelId]
        );

        const lastQuestionId = questions[questions.length - 1].id;
        const isLastQuestion = parseInt(questionId, 10) === lastQuestionId;

        if (isLastQuestion) {
            await pool.query(
                "INSERT INTO user_progress (user_id, level_id, status) VALUES (?, ?, 'completed') ON DUPLICATE KEY UPDATE status = 'completed'",
                [userId, levelId]
            );
        } else {
            await pool.query(
                "INSERT INTO user_progress (user_id, level_id, status) VALUES (?, ?, 'in_progress') ON DUPLICATE KEY UPDATE status = 'in_progress'",
                [userId, levelId]
            );
        }

        const response = h.response({
            status: 'success',
            message: isLastQuestion
                ? 'Correct answer. Level completed!'
                : 'Correct answer. Continue to the next question.',
            isCorrect
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'success',
        message: 'Wrong answer',
        isCorrect
    });
    response.code(200);
    return response;
};

module.exports = {
    getAllLevels, getLevelById, createLevel, updateLevel, deleteLevel, getAllQuestions, getQuestionById, createQuestion, updateQuestion,
    deleteQuestion, checkAnswer
};