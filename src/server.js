const Hapi = require('@hapi/hapi');
const auth = require('./auth/routes');
const dictionary = require('./dictionary/routes');
const information = require('./information/routes');
const quiz = require('./quiz/routes')
const logout = require('./logout/routes');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
    });

    server.route(auth);
    server.route(dictionary);
    server.route(information);
    server.route(quiz);
    server.route(logout);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();