'use strict';

const morgan = require('morgan');
const express = require('express');
const createError = require('http-errors');
const cors = require('./lib/cors-middleware.js');
const errors = require('./lib/error-middleware.js');
const noteRouter = require('./route/note-router.js');
const debug = require('debug')('note:server');

const PORT = process.env.PORT || 2000;
const app = express();

app.use(morgan('dev')); //this is where middleware gets passed in
app.use(cors);
app.use(noteRouter); //route-level middleware, as app middleware.
app.use(errors);

app.listen(PORT, () => {
  debug(`Server listening on port ${PORT}`);
});
