'use strict';

const express = require('express');
const debug = require('debug')('ski:server');
const morgan = require('morgan');
const app = express();
const skiRouter = require('./route/ski-router.js');
const cors = require('./lib/cors-middleware.js');
const errors = require('./lib/error-middleware.js');

const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));
app.use(cors);
app.use(skiRouter);
app.use(errors);

app.listen(PORT, () => {
  debug(`Server up: ${PORT}`);
});
