const { getAllBooksHandler, addBookHandler } = require("./handler");

const routes = [
  {
    method: "GET",
    path: "/books",
    handler: (request, h) => {
     return 'Homepage ini berapa pada path books menggunakan method GET';
    }
  },
];

module.exports = routes;
