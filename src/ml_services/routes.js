const postPredictHandler = require('../ml_services/handler');

const routes = [
    {
        method: 'POST',
        path: '/translate',
        handler: postPredictHandler,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true
            }
        }
    }
];

module.exports = routes;