const Hapi = require('@hapi/hapi');
const routes = require('./router');
const createTable = require('./createTable');

const init = async ()=>{
  // membuat tabel books
  await createTable();

  // inisialisasi server menggunakan Hapi
  const server = Hapi.Server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors:{
        origin: ['*'],
        credentials: true,
      }
    }

  });
  server.route(routes);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();