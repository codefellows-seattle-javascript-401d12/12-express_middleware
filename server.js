'use strict';

const morgan = require('morgan');
const express = require('express');
const debug = require('debug')('note:server');
const artistRouter = require('./route/artist-router.js');

const PORT = 3000;
const app = express();

app.use(morgan('dev'));

app.listen(PORT, () => {
  console.log(`server live on: ${PORT}`);
});
