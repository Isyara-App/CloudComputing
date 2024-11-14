const mysql = require('mysql2');

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'halohehe',
    database: 'isyara_db'
});

con.connect(function (err) {
    if (err) {
        throw err;
    }

    console.log('Connected to database');

    con.query('INSERT INTO isyara_db.users VALUES (?, ?, ?, ?)',
        [2, 'andi', 'asdba@gmail.com', 'afas'], (err, res) => {
            if (err) {
                console.log(err);
            } else {
                res.send('success');
            }
        });
});

module.exports = con;