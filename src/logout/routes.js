const  logoutHandler = require('./logoutHandler');
const validateToken = require('./middleware');

const routes = [
    {
        method: 'POST',
        path: '/api/logout',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: logoutHandler.userLogout,
    }
];

module.exports = routes;