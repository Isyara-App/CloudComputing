/*const { pool } = require('../database');
const Boom = require('@hapi/boom');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const uploadImage = (request, h) => {
    upload.single('image')(request, request.payload, (err, file) => {
        if (err) {
            return h.respnse(err).code(400);
        }
        console.log(file);
        return h.response('Image upload successfully!').code(200);
    });
}

module.exports = uploadImage;*/