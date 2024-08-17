const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const id = nanoid(10);
  const createdAt = new Date().toString();
  const updatedAt = createdAt;
  const finished = pageCount === readPage ? true : false;

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
      message: "Gagal menambahkan buku. Read Page tidak boleh lebih besar dari Page Count",
    });
    response.code(400);
    return response;
  }

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
    createdAt,
    updatedAt,
  };

  books.push(newBook);

  const isSucces = books.filter((book) => book.id === id).length > 0;
  if (isSucces) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Buku gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = (request, h) => {
  const bookList = books.map((book) => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher,
  }));
  const response = h.response({
    status: "success",
    data: {
      books: bookList,
    },
  });
  response.code(200);
  return response;
};

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;
  const book = books.filter((book) => book.id === id)[0];
  if (book !== undefined) {
    const response = h.response({
      status: "success",
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};
const getBookIdByQueryHandler = (request, h) => {
  const { name, finished, reading } = request.query;
  let filteredBooks = books;

  if (name) {
    filteredBooks = filteredBooks.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }
  if (finished === "1") {
    filteredBooks = filteredBooks.filter((book) => book.finished === true);
  } else if(finished === "0") {
    filteredBooks = filteredBooks.filter((book) => book.finished === false);
  }

  if (reading === "1") {
    filteredBooks = filteredBooks.filter((book) => book.reading === true);
  } else if(reading === "0") {
    filteredBooks = filteredBooks.filter((book) => book.reading === false);
  }

  if (filteredBooks.length > 0) {
    const response = h.response({
      status: "success",
      data: {
        filteredBooks,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = { addBookHandler, getAllBooksHandler, getBookByIdHandler, getBookIdByQueryHandler };
