'use strict';

const express = require('express');

var Views = (function () {
  let router = express.Router;

  function Views () {

    router.get('/', function(req, res, next) {
      res.render('index');
    });

    return router;
  }

  return Views;
})();


module.exports = Views;
