const letterHandler = require('./letterHandler');
const wordHandler = require('./wordHandler');
const validateToken = require('../middleware/middleware');

const routes = [
    //Letters
    {
        method: 'GET',
        path: '/dictionary/letters',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: letterHandler.getAllLetters
    },
    {
        method: 'GET',
        path: '/dictionary/letters/{id}',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: letterHandler.getLetterById
    },
    {
        method: 'POST',
        path: '/dictionary/letters',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: letterHandler.createLetter
    },
    {
        method: 'PUT',
        path: '/dictionary/letters/{id}',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: letterHandler.updateLetter
    },
    {
        method: 'DELETE',
        path: '/dictionary/letters/{id}',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: letterHandler.deleteLetter
    },

    //Words
    {
        method: 'GET',
        path: '/dictionary/words',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: wordHandler.getAllWords
    },
    {
        method: 'GET',
        path: '/dictionary/words/{id}',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: wordHandler.getWordById
    },
    {
        method: 'POST',
        path: '/dictionary/words',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: wordHandler.createWord
    },
    {
        method: 'PUT',
        path: '/dictionary/words/{id}',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: wordHandler.updateWord
    },
    {
        method: 'DELETE',
        path: '/dictionary/words/{id}',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: wordHandler.deleteWord
    },
];

module.exports = routes;