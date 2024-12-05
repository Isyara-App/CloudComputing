const levelHandler = require("./levelHandler");
const questionHandler = require("./questionHandler")
const validateToken = require('../middleware/middleware');

const routes = [
    //Levels
    {
        method: "GET",
        path: "/quiz/levels",
        options: {
            pre: [{ method: validateToken }]
        },
        handler: levelHandler.getAllLevels
    },
    {
        method: "GET",
        path: "/quiz/levels/{levelId}",
        options: {
            pre: [{ method: validateToken }]
        },
        handler: levelHandler.getLevelById
    },
    {
        method: "POST",
        path: "/quiz/levels",
        options: {
            pre: [{ method: validateToken }]
        },
        handler: levelHandler.createLevel
    },
    {
        method: "PUT",
        path: "/quiz/levels/{levelId}",
        options: {
            pre: [{ method: validateToken }]
        },
        handler: levelHandler.updateLevel
    },
    {
        method: "DELETE",
        path: "/quiz/levels/{levelId}",
        options: {
            pre: [{ method: validateToken }]
        },
        handler: levelHandler.deleteLevel
    },

    //Questions
    {
        method: "GET",
        path: "/quiz/levels/{levelId}/questions",
        options: {
            pre: [{ method: validateToken }]
        },
        handler: questionHandler.getAllQuestions,
    },
    {
        method: "GET",
        path: "/quiz/levels/{levelId}/questions/{questionId}",
        options: {
            pre: [{ method: validateToken }]
        },
        handler: questionHandler.getQuestionById,
    },
    {
        method: "POST",
        path: "/quiz/levels/{levelId}/questions",
        options: {
            pre: [{ method: validateToken }]
        },
        handler: questionHandler.createQuestion,
    },
    {
        method: "PUT",
        path: "/quiz/levels/{levelId}/questions/{questionId}",
        options: {
            pre: [{ method: validateToken }]
        },
        handler: questionHandler.updateQuestion,
    },
    {
        method: "DELETE",
        path: "/quiz/levels/{levelId}/questions/{questionId}",
        options: {
            pre: [{ method: validateToken }]
        },
        handler: questionHandler.deleteQuestion,
    },

    //Check Answer
    {
        method: "POST",
        path: "/quiz/levels/{levelId}/questions/{questionId}/answer",
        options: {
            pre: [{ method: validateToken }]
        },
        handler: questionHandler.checkAnswer,
    },

    //Check Completion
    {
        method: "GET",
        path: "/quiz/levels/{levelId}/completion",
        options: {
            pre: [{ method: validateToken }]
        },
        handler: questionHandler.checkCompletion,
    },
];

module.exports = routes;