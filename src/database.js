const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'halohehe',
    database: 'isyara_db'
});

(async () => {
    try {
        await pool.query('SELECT 1');
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Database connection error:", err);
    }
})();

module.exports = { pool };