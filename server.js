'use strict';

const morgan = require('morgan');
const express = require('express');
const createErrors = require('http-errors');
const debug = require('debug')('dogs:server');
const dogRouter = require('./route/dog-router.js');
const cors = require('./lib/cors-middleware.js');
const errors = require('./lib/error-middleware.js');

const PORT = process.argv.PORT || 8000;
const app = express();

app.use(morgan('dev'));
app.use(cors);
app.use(dogRouter);
app.use(errors);

app.listen(PORT, () => {
  console.log(`server up: ${PORT}`);
});
