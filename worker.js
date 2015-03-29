'use strict';

const http  = require('http');
const colors = require('colors');
const mongoose = require('mongoose');
const ServerExpress = require('./server');

var Worker = (function () {

  let port     = normalizePort(process.env.PORT || '3000');
  let conn_url = `mongodb://${ config.IP }/${ config.DB }`;
  let serverExpress;
  let server;

  function Worker (config) {
    let Conn = mongoose.createConnection(conn_url);
    Conn.on('open', function () {
      console.log(colors.green('Connection database success'));

      serverExpress = new ServerExpress();
      server = http.createServer(serverExpress);
      server.listen(port);
      server.on('error', onError);
      server.on('listening', onListening);

    });

    Conn.on('error', function (err) {
			console.log(colors.red(err));
		});

  }

  function normalizePort(val) {
    let port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    let bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    switch (error.code) {
      case 'EACCES':
        console.log(colors.red(`${ bind } requires elevated privileges`));
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.log(colors.red(`${ bind } is already in use`));
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  function onListening() {
    let addr = server.address();
    let bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    console.log(colors.green(`Server run listening ${ bind }`));
  }

  return Worker;

})();

module.exports = Worker;
