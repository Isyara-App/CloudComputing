const Hapi = require('@hapi/hapi');
const auth = require('./auth/routes');
const dictionary = require('./dictionary/routes');
const information = require('./information/routes');
const logout = require('./logout/routes');
//const profile = require('./profile/routes');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
    });

    server.route(auth);
    server.route(dictionary);
    server.route(information);
    server.route(logout);
    //server.route(profile);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();