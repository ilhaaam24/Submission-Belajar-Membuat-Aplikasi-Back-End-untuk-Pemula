const { getAllBooksHandler, addBookHandler, getBookByIdHandler, getBookIdByQueryHandler } = require("./handler");

const routes = [
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler
  },{
    method: 'GET',
    path: '/book',
    handler: getBookIdByQueryHandler
  },{
    method: 'POST',
    path: '/books',
    handler: addBookHandler
  }
];

module.exports = routes;
