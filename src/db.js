const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '456789',
  database: 'books',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

module.exports = pool;