/* const postPredictHandler = require('../ml_services/handler');
const validateToken = require('../middleware/middleware');

const routes = [
    {
        method: 'POST',
        path: '/translate',
        handler: postPredictHandler,
        options: {
            pre: [{ method: validateToken }],
            payload: {
                allow: 'multipart/form-data',
                multipart: true
            }
        }
    }
];

module.exports = routes; */