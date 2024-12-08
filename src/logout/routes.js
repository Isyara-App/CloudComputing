const  logoutHandler = require('./logoutHandler');
const contactHandler = require('./contactHandler');

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
];

module.exports = routes;