/**
*
*
**/

const { SERVICE_PORT = 4001, PORT } = require('./config/constants/VARIABLES');
const port = PORT || SERVICE_PORT;
const { sequelizeMigrate } = require('./models');
process.on('unhandledRejection', (e) => {
  console.log(e.message, e.stack);
});

sequelizeMigrate().then(() => {
  const server = require('./server')
  server.listen(port, '0.0.0.0', (error) => {
    if (error) {
      console.log(error)
    }

    console.info('App running on 🌎 at http://localhost:%s', port)
  })
});
