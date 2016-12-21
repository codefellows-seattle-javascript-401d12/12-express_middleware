'use strict';

const express = require('express');
const debug = require('debug')('ski:server');
const morgan = require('morgan');
const app = express();
const skiRouter = require('./route/ski-router.js');
//TODO: require in cors middleware
//TODO: require in erros middlware

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(skiRouter);

//TODO: set up app.use cors middleware
//TODO: set up app.use errors middleware

app.listen(PORT, () => {
  debug(`Server up: ${PORT}`);
});
