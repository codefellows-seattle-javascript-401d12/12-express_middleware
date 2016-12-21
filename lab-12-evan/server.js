'use strict';

const morgan = require('morgan');
const express = require('express');
const createError = require('http-errors');
const cors = require('./lib/CORS-middleware.js');
const errors = require('./lib/ERRORS-middleware.js');
const debug = require('debug')('artist:server');
const artistRouter = require('./route/artist-router.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));
app.use(cors);
app.use(artistRouter);
app.use(errors);

app.listen(PORT, () => {
  console.log(`Artists being served on ${PORT}`);
});
