'use strict';

const morgan = require('morgan');
const express = require('express');
const createError = require('http-errors');
const cors = require('./lib/cors-middleware.js');
const errors = require('./lib/error-middleware.js');
const debug = require('debug')('spiritAnimal:server');
const spiritAnimalRouter = require('./route/spiritAnimal-router.js');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(morgan('dev'));
app.use(cors);
app.use(spiritAnimalRouter);
app.use(errors);

app.listen(PORT, () => {
  console.log(`server up: ${PORT}`);
});
