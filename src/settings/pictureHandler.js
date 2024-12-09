const { Storage } = require('@google-cloud/storage');
const path = require('path');
const Boom = require('@hapi/boom');
const { pool } = require('../database');

const pathKey = path.resolve('./serviceaccountkey.json');

const storage = new Storage({
    projectId: 'isyaraapp',
    keyFilename: pathKey
});

const bucketName = 'isyara-storage';
const bucket = storage.bucket(bucketName);

function getPublicUrl(filename) {
    return `https://storage.googleapis.com/${bucketName}/${filename}`;
}

const DEFAULT_IMAGE_URL = 'https://storage.googleapis.com/isyara-storage/ProfilePicture/ProfilePicture_Default.png';

let imgUpload = {}

imgUpload.uploadToGCS = async (request) => {
    const file = request.payload.image;

    if (!file) {
        throw Boom.badRequest('Unsuccessful update profile picture. Please attach a picture.');
    }

    const gcsName = `ProfilePicture/${Date.now()}-${Math.random().toString(36).substring(7)}`;
    const gcsFile = bucket.file(gcsName);

    const stream = gcsFile.createWriteStream({
        metadata: {
            contentType: file.hapi.headers['content-type'],
        },
    });

    return new Promise((resolve, reject) => {
        stream.on('error', (err) => {
            console.error('Error uploading file to GCS:', err);
            reject(err);
        });

        stream.on('finish', () => {
            const publicUrl = getPublicUrl(gcsName);
            console.log('File successfully uploaded to GCS. URL:', publicUrl);
            resolve(publicUrl);
        });

        stream.end(file._data);
    });
};

imgUpload.deleteProfilePicture = async (id) => {
    const [result] = await pool.query(
        'UPDATE users SET image_url = ? WHERE id = ?',
        [DEFAULT_IMAGE_URL, id]
    );

    if (result.affectedRows === 0) {
        throw Boom.notFound('User not found');
    }

    return {
        status: 'success',
        message: 'Profile picture has been reset to default',
    };
};

module.exports = imgUpload;

