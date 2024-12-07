const { pool } = require('../database');
const Boom = require('@hapi/boom');

const getAllQuestions = async (request, h) => {
    const { levelId } = request.params;

    const [result] = await pool.query(
        "SELECT * FROM questions WHERE level_id = ?",
        [levelId]
    );

    if (result.length === 0) {
        throw Boom.notFound('Questions not found');
    }

    const totalQuestions = result.length;

    const questions = result.map((question, index) => ({
        ...question,
        name: `Question ${index + 1} of ${totalQuestions}`,
        options: Array.isArray(question.options) ? question.options : JSON.parse(question.options)
    }));

    const response = h.response({
        status: 'success',
        message: 'Questions retrieved successfully',
        data: questions
    });
    response.code(200);
    return response;
};

const getQuestionById = async (request, h) => {
    const { questionId, levelId } = request.params;

    const [result] = await pool.query(
        'SELECT id, question, correct_option, options, image_url FROM questions WHERE level_id = ? AND id = ?',
        [levelId, questionId]
    );

    if (result.length === 0) {
        throw Boom.notFound('Question not found');
    }

    const question = result[0];

    const [allQuestions] = await pool.query(
        'SELECT id FROM questions WHERE level_id = ? ORDER BY id ASC',
        [levelId]
    );

    const totalQuestions = allQuestions.length;
    const questionIndex = allQuestions.findIndex(q => q.id === parseInt(questionId)) + 1;

    question.name = `Question ${questionIndex} of ${totalQuestions}`;
    question.options = Array.isArray(question.options) ? question.options : JSON.parse(question.options); 

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
    const { question, correct_option, options, image_url } = payload;

    if (!question || !correct_option || !options || !image_url) {
        throw Boom.badRequest('Please fill all the required fields');
    }

    const [maxIdResult] = await pool.query(
        'SELECT MAX(id) AS maxId FROM questions WHERE level_id = ?',
        [levelId]
    );

    const nextId = (maxIdResult[0].maxId || 0) + 1;

    await pool.query(
        "INSERT INTO questions (id, level_id, question, correct_option, options, image_url) VALUES (?, ?, ?, ?, ?, ?)",
        [nextId, levelId, question, correct_option, JSON.stringify(options), image_url]
    );

    const [newData] = await pool.query(
        'SELECT id, question, correct_option, options, image_url FROM questions WHERE id = ? AND level_id = ?',
        [nextId, levelId]
    );

    const [totalQuestions] = await pool.query(
        'SELECT COUNT(id) AS totalQuestions FROM questions WHERE level_id = ?',
        [levelId]
    );

    const questionData = {
        ...newData[0],
        name: `Question ${nextId} of ${totalQuestions[0].totalQuestions}`,
        options: Array.isArray(newData[0].options) ? newData[0].options : JSON.parse(newData[0].options) 
    };

    const response = h.response({
        status: 'success',
        message: 'Question created successfully',
        data: questionData
    });
    response.code(201);
    return response;
};

const updateQuestion = async (request, h) => {
    const { questionId, levelId } = request.params;
    const { question, correct_option, options, image_url } = request.payload;

    if (!question || !correct_option || !options || !image_url) {
        throw Boom.badRequest('All fields are required');
    }

    const [result] = await pool.query(
        'UPDATE questions SET question = ?, correct_option = ?, options = ?, image_url = ? WHERE id = ? AND level_id = ?',
        [question, correct_option, JSON.stringify(options), image_url, questionId, levelId]
    );

    if (result.affectedRows === 0) {
        throw Boom.notFound('Question not found');
    }

    const [updatedData] = await pool.query(
        'SELECT id, question, correct_option, options, image_url FROM questions WHERE id = ? AND level_id = ?',
        [questionId, levelId]
    );

    const [totalQuestions] = await pool.query(
        'SELECT COUNT(id) AS totalQuestions FROM questions WHERE level_id = ?',
        [levelId]
    );

    const questionData = {
        ...updatedData[0],
        name: `Question ${questionId} of ${totalQuestions[0].totalQuestions}`,
        options: Array.isArray(updatedData[0].options) ? updatedData[0].options : JSON.parse(updatedData[0].options)
    };

    const response = h.response({
        status: 'success',
        message: 'Question updated successfully',
        data: questionData
    });
    response.code(200);
    return response;
};

const deleteQuestion = async (request, h) => {
    const { questionId, levelId } = request.params;

    const [result] = await pool.query(
        'DELETE FROM questions WHERE id = ? AND level_id = ?',
        [questionId, levelId]
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

    await pool.query(
        "INSERT INTO user_answers (user_id, question_id, level_id, is_correct) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE is_correct = ?",
        [userId, questionId, levelId, isCorrect, isCorrect]
    );

    const response = h.response({
        status: 'success',
        message: isCorrect ? 'Correct answer' : 'Wrong answer',
        isCorrect
    });
    response.code(200);
    return response;
};


const checkCompletion = async (request, h) => {
    const { levelId } = request.params;
    const userId = request.user?.id;
    
    if (!userId) {
        throw Boom.unauthorized('User not authenticated');
    }

    const [questions] = await pool.query(
        'SELECT id FROM questions WHERE level_id = ?',
        [levelId]
    );

    if (questions.length === 0) {
        throw Boom.notFound('No questions found for this level');
    }

    const [userAnswers] = await pool.query(
        'SELECT is_correct FROM user_answers WHERE user_id = ? AND question_id IN (?)',
        [userId, questions.map(q => q.id)]
    );

    const allCorrect = userAnswers.every(answer => answer.is_correct);
    
    const status = allCorrect ? 'completed' : 'in_progress';
    
    await pool.query(
        'INSERT INTO user_progress (user_id, level_id, status) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE status = ?',
        [userId, levelId, status, status]
    );

    const [levelResult] = await pool.query(
        "SELECT name FROM levels WHERE id = ?",
        [levelId]
    );
    
    if (levelResult.length === 0) {
        throw Boom.notFound('Level not found');
    }
    
    const levelName = levelResult[0].name;

    let message, imageUrl;

    if (allCorrect) {
        message = `Congrats! Kamu telah menyelesaikan quiz ${levelName}. Silahkan lanjutkan perjalanan mu!`;
        imageUrl = 'https://storage.googleapis.com/isyara-storage/Quiz/Smile.png';
    } else {
        message = 'Failed. Oh tidak, kamu gagal menjawab semua pertanyaan dengan benar.';
        imageUrl = 'https://storage.googleapis.com/isyara-storage/Quiz/Sad.png';
    }

    const response = h.response({
        status: 'success',
        message: message,
        imageUrl: imageUrl,
    });
    response.code(200);
    return response;
};

module.exports = {
    getAllQuestions, getQuestionById, createQuestion, updateQuestion, deleteQuestion, checkAnswer, checkCompletion
};