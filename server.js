'use strict';

const morgan = require('morgan');
const express = require('express');
const debug = require('debug')('note:server');

// const error = require('./lib/error-middleware.js');
// const cors = require('./lib/cors-middleware.js');
const route = require('./route/note-routes.js');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
// app.use(error);
// app.use(cors);
app.use(route);

app.listen(PORT, () => {
  debug(`server up::PORT-${PORT}`);
});
