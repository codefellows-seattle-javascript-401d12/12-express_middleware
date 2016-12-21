'use strict';

const morgan = require('morgan');
const express = require('express');
const createError = require('http-errors');
const debug = require('debug')('hat:server');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));

app.listen(PORT, () => {
  console.log(`server up at: ${PORT}`);
});
