'use strict';

const createError = require('http-errors');
const debug = require('debug')('artist:ERROR-middleware');

module.exports = function(err, req, res, next) {

  if(err.status) {
    debug('user error');

    res.status(err.status).send(err.name);
    next();
    return;
  };

  debug('sever error');
  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
};
