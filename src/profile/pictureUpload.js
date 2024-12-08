"use strict";
const { Storage } = require('@google-cloud/storage');
const path = require('path');
const Boom = require('@hapi/boom');
const { pool } = require('../database');

const pathKey = path.resolve('../servicecaccount.json');

const storage = new Storage({
    projectId: 'isyaraapp',
    keyFilename: pathKey
});

const bucketName = 'isyara-storage';
const bucket = storage.bucket(bucketName);

function getPublicUrl(filename) {
    return `https://storage.googleapis.com/${bucketName}/${filename}`;
}

let imgUpload = {}

imgUpload.uploadToGCS = async (request, h) => {
    const file = request.payload.image;

    if (!file) {
        throw Boom.badRequest('Unsuccessfull update profile picture. Please attach a picture');
    }

    const gcsName = `ProfilePicture/${(new Date(), 'yyyymmmmdd-HHMMss')}`;
    const gcsFile = bucket.file(gcsName);

    const stream = gcsFile.createWriteStream({
        metadata: {
            contentType: file.Hapi.headers['content-type'],
        }
    });

    return new Promise((resolve, reject) => {

        stream.on('error', (err) => {
            request.payload.cloudStorageError = err;
            reject(err);
        });

        stream.on('finish', () => {
            request.payload.cloudStorageObject = gcsName;
            request.payload.cloudStoragePublicUrl = getPublicUrl(gcsName);

            resolve(h.response(request.payload).code(200));
        });

        const { id } = request.params;

        pool.query(
            'UPDATE users SET image_url = ? WHERE id = ?',
            [getPublicUrl(gcsName), id]
        );

        stream.end(file._data);
    });
}

module.exports = imgUpload;

