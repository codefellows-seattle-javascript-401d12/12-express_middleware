'use strict';

const morgan = require('morgan');
const express = require('express');
const createError = require('http-errors');
const cors = require('./lib/cors-middleware.js');
const debug = require('debug')('pin:server');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));
app.use(cors);

app.listen(PORT, () => {
  console.log(`server running: ${PORT}`);
});
