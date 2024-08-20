const Hapi = require('@hapi/hapi');
const routes = require('./router');

const init = async ()=>{
  const server = Hapi.Server({
    port: 9000,
    host: 'localhost',
    routes: {
      cors:{
        origin: ['*'],
        credentials: true
      }
    }

  });
  server.route(routes);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();