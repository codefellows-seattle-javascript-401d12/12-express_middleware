'use strict';

const morgan = require('morgan');
const express = require('express');
const debug = require('debug')('mnp:server');

const PORT = process.env.PORT || 8000;
const app = express();

app.use(morgan('dev'));

app.list(PORT, () => {
  debug('Server up:', PORT);
});
