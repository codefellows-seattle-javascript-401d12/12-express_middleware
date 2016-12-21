'use strict';

const morgan = require('morgan');
const express = require('express');
const createError = require('http-errors');
const debug = require('debug')('person:server');
const cors = require('./lib/cors-middleware.js');
const errors = require('./lib/err-middleware.js');
const personRouter = require('./route/person-router.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));
app.use(cors);
app.use(personRouter);
app.use(errors);

app.listen(PORT, () => {
  debug(`served up on ${PORT}`);
});
