'use strict';

const morgan = require('morgan');
const express = require('express');
const createError = require('http-errors');
const cors = require('./lib/cors-middleware.js');
const errors = require('./lib/err-middleware.js');
const debug = require('debug')('artist:server');
const artistRouter = require('./route/artist-router.js');

const PORT = 3000;
const app = express();

app.use(morgan('dev'));
app.use(cors);
app.use(artistRouter);
app.use(errors);

app.listen(PORT, () => {
  console.log(`server live on: ${PORT}`);
});
