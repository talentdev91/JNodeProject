'use strict';

const express = require('express');
const path    = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const swig         = require('swig');

var ServerExpress = (function () {

  let serverExpress;

  function ServerExpress(conn) {
    serverExpress = express();
    // view engine
    serverExpress.engine('html', swig.renderFile);
    serverExpress.set('views', path.join(__dirname, 'views'));
    serverExpress.set('view engine', 'html');
    serverExpress.set('view cache', false);
    //serverExpress.use(favicon(__dirname + '/public/favicon.ico'));
    serverExpress.use(bodyParser.json());
    serverExpress.use(bodyParser.urlencoded({ extended: false }));
    serverExpress.use(cookieParser());
    serverExpress.use(express.static(path.join(__dirname, 'public')));
    swig.setDefaults({ cache: false });

    setRoutes();

    // catch 404 and forward to error handler
    serverExpress.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    return serverExpress;
  }

  // set routes
  function setRoutes () {
    let views = require('./routes/views.js');

    serverExpress.use('/', views);
  }

  // error handlers
  function errorHandler () {
    serverExpress.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.json({ message: err.message, err: {} });
    });
  }

  return ServerExpress;

})();

module.exports = ServerExpress;
