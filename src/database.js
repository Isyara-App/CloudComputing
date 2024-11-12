const { createPool } = require('mysql');

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'halohehe',
    connectionLimit: 10,
});

pool.query(`SELECT * FROM mydb.user_login`, (err, res) => {
    return console.log(res);
});