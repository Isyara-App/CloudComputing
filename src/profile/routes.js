const validateToken = require('../middleware/middleware');

const routes = [
    {
        method: 'POST',
        path: '/upload',
        options: {
            pre: [{ method: validateToken }]
        },
        handler: ,
    }
];

module.exports = routes;