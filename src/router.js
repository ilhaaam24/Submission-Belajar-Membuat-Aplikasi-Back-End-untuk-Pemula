const { getAllBooksHandler, addBookHandler, getBookByIdHandler } = require("./handler");

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
  }
];

module.exports = routes;
