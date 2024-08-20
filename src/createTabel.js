const poo = require('./db');


const createTable = async() =>{
  const createBookTableQuery = `
    CREATE TABLE IF NOT EXISTS books (
      id VARCHAR(10) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      year INT,
      author VARCHAR(255),
      summary TEXT,
      publisher VARCHAR(255),
      pageCount INT,
      readPage INT,
      finished BOOLEAN,
      reading BOOLEAN,
      insertedAt DATETIME,
      updatedAt DATETIME
    );
  `;
}
  try {
    const [result] = await pool.execute(createBooksTableQuery);
    console.log('Tabel books berhasil dibuat:', result);
  } catch (err) {
    console.error('Gagal membuat tabel books:', err);
  };

createTable();