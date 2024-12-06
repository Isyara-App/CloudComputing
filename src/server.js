const Hapi = require('@hapi/hapi');
const auth = require('./auth/routes');
const dictionary = require('./dictionary/routes');
const information = require('./information/routes');
const quiz = require('./quiz/routes')
const logout = require('./logout/routes');
const translate = require('./ml_services/routes');
const loadModel = require('./ml_services/loadModel');
const InputError = require('./execptions/InputError');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
    });

    const model = await loadModel();
    server.app.model = model;

    server.route(auth);
    server.route(dictionary);
    server.route(information);
    server.route(quiz);
    server.route(logout);
    server.route(translate);

    server.ext('onPreResponse', function(request, h) {
        const response = request.response;

        if (response instanceof InputError) {
            const newResponse = h.response({
                status: 'fail',
                message: `${response.message}`
            })
            newResponse.code(response.statusCode);
            return newResponse;
        }

        if (response.isBoom) {
            const newResponse = h.response({
                status: 'fail',
                message: response.message
            })
            newResponse.code(response.statusCode);
            return newResponse;
        }

        return h.continue;
    })

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();