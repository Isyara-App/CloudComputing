const { createPool } = require('mysql');

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'halohehe',
    connectionLimit: 10,
});

pool.query(`SELECT * FROM isyara_db`, (err, res) => {
    return console.log(res);
});

module.exports = pool;