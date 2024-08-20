const { nanoid } = require("nanoid");
const books = require("./books");
const pool = require("./db");

const addBookHandler = async (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const id = nanoid(10);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  if (name === undefined || name === "") {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }
  const finished = pageCount === readPage;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  try {
    const query = `
      INSERT INTO books (id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await pool.execute(query, Object.values(newBook));

    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  } catch (err) {
    const response = h.response({
      status: "error",
      message: "Gagal menambahkan buku",
    });
    response.code(500);
    return response;
  }
};const getAllBooksHandler = async (request, h) => {
  const { name, reading, finished } = request.query;

  let query = "SELECT id, name, publisher FROM books";
  const conditions = [];
  const params = [];

  if (name) {
    conditions.push("LOWER(name) LIKE ?");
    params.push(`%${name.toLowerCase()}%`);
  }

  if (reading === "1") {
    conditions.push("reading = true");
  } else if (reading === "0") {
    conditions.push("reading = false");
  }

  if (finished === "1") {
    conditions.push("finished = true");
  } else if (finished === "0") {
    conditions.push("finished = false");
  }

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  try {
    const [rows] = await pool.execute(query, params);
    const response = h.response({
      status: "success",
      data: {
        books: rows,
      },
    });
    response.code(200);
    return response;
  } catch (err) {
    console.error("Error fetching books:", err);
    const response = h.response({
      status: "error",
      message: "Gagal mengambil data buku",
    });
    response.code(500);
    return response;
  }
};
const getBookByIdHandler = async (request, h) => {
  const { bookId } = request.params;
  const detailBook = books.filter((book) => book.id === bookId)[0];
  const query = `SELECT * FROM books WHERE id = ?`;

  // if (detailBook !== undefined) {
  //   const response = h.response({
  //     status: "success",
  //     data: {
  //       book: detailBook,
  //     },
  //   });
  //   response.code(200);
  //   return response;
  // }

  // const response = h.response({
  //   status: "fail",
  //   message: "Buku tidak ditemukan",
  // });
  // response.code(404);
  // return response;

  try {
    const [rows] = await pool.execute(query, [bookId]);
    const response = h.response({
      status: "success",
      data: {
        book: rows[0],
      },
    });
    response.code(200);
    return response;
  } catch (error) {
    const response = h.response({
      status: "fail",
      message: "Buku tidak ditemukan",
    });
    response.code(404);
    return response;
  }
};
const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === bookId);

  if (index === -1) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }

  if (name === undefined || name === "") {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }

  books[index] = {
    ...books[index],
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    updatedAt,
  };
  const response = h.response({
    status: "success",
    message: "Buku berhasil diperbarui",
  });
  response.code(200);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const index = books.findIndex((book) => book.id === bookId);

  if (index === -1) {
    const response = h.response({
      status: "fail",
      message: "Buku gagal dihapus. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }
  books.splice(index, 1);
  const response = h.response({
    status: "success",
    message: "Buku berhasil dihapus",
  });
  response.code(200);
  return response;
};
module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, deleteBookByIdHandler, editBookByIdHandler };
