const uploadImage = require('./updateProfile');

const routes = [
    {
        method: 'POST',
        path: '/api/upload',
        handler: uploadImage.upload,
    }
];

module.exports = routes;