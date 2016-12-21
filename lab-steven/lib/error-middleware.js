'use strict';

const createError = require('http-errors');
const debug = require('debug')('student:error-middleware');

module.exports = function(err, request, response, next) {
  console.error(err.message);

  if (err.status) {
    debug('User error.');

    response.status(err.status).send(err.name);
    next();
    return;
  }

  debug('Server error.');
  err = createError(500, err.message);
  response.status(err.status).send(err.name);
  next();
};
