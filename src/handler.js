const { nanoid } = require("nanoid");
const books = require("./books");

const addBookHandler = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
  const id = nanoid(10);
  const createdAt = new Date().toString();
  const updatedAt = createdAt;

  if(name === undefined || name === '') {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
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

const getAllBooksHandler =(request, h) =>{
  const bookList = books.map(book => ({
    id: book.id,
    name: book.name,
    publisher: book.publisher

  }));
  const response = h.response({
    status: 'success',
    data: {
      books: bookList
    }
  });
  response.code(200);
  return response;
}

const getBookByIdHandler = (request, h) =>{
  const {id} = request.params;
  const book = books.filter(book => book.id === id)[0];
  if(book !== undefined){
    const response = h.response({
      status: 'success',
      data: {
        book
      }
    })
    response.code(200);
    return response


  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  })
  response.code(404);
  return response
}
const getBookIdByNameHandler = (request, h) => {
  const name = request.query.name;
  const book = books.filter(book => book.name.toLowerCase() === name);

  if(book.length > 0){
    const response = h.response({
      status : 'success',
      data:{
        book
      }
    });
    response.code(200);
    return response
  }

  const response = h.response({
    status : 'fail',
    message : 'Buku tidak ditemukan'
  });
  response.code(404);
  return response
}

module.exports = { addBookHandler, getAllBooksHandler ,getBookByIdHandler,getBookIdByNameHandler};
