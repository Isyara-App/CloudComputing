/* const multer = require('multer');
const upload = multer({ dest: 'profile_pic/' });

upload.single('image'), (request, h) => {
    const respone = h.response({
        message: 'Profile Picture changed successfully',
    })
    respone.code(200);
    return respone;
};

module.exports = upload; */