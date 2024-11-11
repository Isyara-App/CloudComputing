const authHandler = require('./handler');

const routes = [
    {
        method: 'POST',
        path: '/register',
        handler: authHandler.registerUser
    },
    {
        method: 'POST',
        path: '/login',
        handler: authHandler.loginUser
    },
];

module.exports = routes;