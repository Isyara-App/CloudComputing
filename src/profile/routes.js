const validateToken = require('../middleware/middleware');
const profilePicHandler = require('./updateProfile');

const routes = [
    {
        method: 'POST',
        path: '/profile/upload',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: profilePicHandler.createProfilePic,
    },
    {
        method: 'PUT',
        path: '/profile/upload/{id}',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: profilePicHandler.updateProiflePic,
    }
];

module.exports = routes;