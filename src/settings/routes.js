const logoutHandler = require('./logoutHandler');
const contactHandler = require('./contactHandler');
const profileHandler = require('./profileHandler');
const validateToken = require('../middleware/middleware');

const routes = [
    {
        method: 'POST',
        path: '/api/logout',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: logoutHandler.userLogout,
    },
    {
        method: 'POST',
        path: '/contact',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: contactHandler.createContactMessage,
    },
    {
        method: 'PUT',
        path: '/profile/{id}',
        options: {
            pre: [{ method: validateToken }],
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
                maxBytes: 10485760, // Max file size (10 MB)
                output: 'stream',
                parse: true
            }
        },
        handler: profileHandler.updateProfile,
    },
    {
        method: 'DELETE',
        path: '/profile/{id}/picture',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: profileHandler.deleteProfilePicture,
    }
];

module.exports = routes;