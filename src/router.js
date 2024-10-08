const { getAllBooksHandler, addBookHandler, getBookByIdHandler, deleteBookByIdHandler, editBookByIdHandler } = require('./handler');

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  }, {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookByIdHandler
  }, {
    method: 'POST',
    path: '/books',
    handler: addBookHandler
  }, {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: editBookByIdHandler
  }, {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: deleteBookByIdHandler
  }
];

module.exports = routes;
