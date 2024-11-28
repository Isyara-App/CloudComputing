const quizHandler = require("./quizHandler");
const validateToken = require('../middleware/middleware');

const routes = [
    //Levels
    {
        method: "GET",
        path: "/quiz/levels",
        options: {
            pre: [{ method: validateToken }]
        },
        handler: quizHandler.getAllLevels
    },
    {
        method: "GET",
        path: "/quiz/levels/{levelId}",
        options: {
            pre: [{ method: validateToken }]
        },
        handler: quizHandler.getLevelById
    },
    {
        method: "POST",
        path: "/quiz/levels",
        options: {
            pre: [{ method: validateToken }]
        },
        handler: quizHandler.createLevel
    },
    {
        method: "PUT",
        path: "/quiz/levels/{levelId}",
        options: {
            pre: [{ method: validateToken }]
        },
        handler: quizHandler.updateLevel
    },
    {
        method: "DELETE",
        path: "/quiz/levels/{levelId}",
        options: {
            pre: [{ method: validateToken }]
        },
        handler: quizHandler.deleteLevel
    },

    //Questions
    {
        method: "GET",
        path: "/quiz/levels/{levelId}/questions",
        options: {
            pre: [{ method: validateToken }]
        },
        handler: quizHandler.getAllQuestions,
    },
    {
        method: "GET",
        path: "/quiz/levels/{levelId}/questions/{questionId}",
        options: {
            pre: [{ method: validateToken }]
        },
        handler: quizHandler.getQuestionById,
    },
    {
        method: "POST",
        path: "/quiz/levels/{levelId}/questions",
        options: {
            pre: [{ method: validateToken }]
        },
        handler: quizHandler.createQuestion,
    },
    {
        method: "PUT",
        path: "/quiz/levels/{levelId}/questions/{questionId}",
        options: {
            pre: [{ method: validateToken }]
        },
        handler: quizHandler.updateLevel,
    },
    {
        method: "DELETE",
        path: "/quiz/levels/{levelId}/questions/{questionId}",
        options: {
            pre: [{ method: validateToken }]
        },
        handler: quizHandler.deleteLevel,
    },

    //Check Answer
    {
        method: "POST",
        path: "/quiz/levels/{levelId}/questions/{questionId}/answer",
        options: {
            pre: [{ method: validateToken }]
        },
        handler: quizHandler.checkAnswer,
    },
];

module.exports = routes;