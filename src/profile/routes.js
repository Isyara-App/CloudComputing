const profileHandler = require('../profile/profileHandler');
const validateToken = require('../middleware/middleware');

const routes = [
    {
        method: 'PUT',
        path: '/update/picture/{id}',
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
        handler: profileHandler.updateProfilePicture,
    },
    {
        method: 'PUT',
        path: '/update/username/{id}',
        options: {
            pre: [{ method: validateToken}]
        },
        handler: profileHandler.updateUsername,
    }
];

module.exports = routes;