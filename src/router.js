const { getAllBooksHandler, addBookHandler, getBookByIdHandler, getBookIdByQueryHandler, deleteBookByIdHandler , editBookByIdHandler} = require("./handler");

const routes = [
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdHandler
  },{
    method: 'GET',
    path: '/book',
    handler: getBookIdByQueryHandler
  },{
    method: 'POST',
    path: '/books',
    handler: addBookHandler
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookByIdHandler
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookByIdHandler
  }
];

module.exports = routes;
