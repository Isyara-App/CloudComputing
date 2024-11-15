const letterHandler = require('./letterHandler');
const wordHandler = require('./wordHandler');

module.exports = [
    //Letters
    {
        method: 'GET',
        path: '/dictionary/letters',
        handler: letterHandler.getAllLetters
    },
    {
        method: 'GET',
        path: '/dictionary/letters/{id}',
        handler: letterHandler.getLetterById
    },
    {
        method: 'POST',
        path: '/dictionary/letters',
        handler: letterHandler.createLetter
    },
    {
        method: 'PUT',
        path: '/dictionary/letters/{id}',
        handler: letterHandler.updateLetter
    },
    {
        method: 'DELETE',
        path: '/dictionary/letters/{id}',
        handler: letterHandler.deleteLetter
    },

    //Words
    {
        method: 'GET',
        path: '/dictionary/words',
        handler: wordHandler.getAllWords
    },
    {
        method: 'GET',
        path: '/dictionary/words/{id}',
        handler: wordHandler.getWordById
    },
    {
        method: 'POST',
        path: '/dictionary/words',
        handler: wordHandler.createWord
    },
    {
        method: 'PUT',
        path: '/dictionary/words/{id}',
        handler: wordHandler.updateWord
    },
    {
        method: 'DELETE',
        path: '/dictionary/words/{id}',
        handler: wordHandler.deleteWord
    },
];