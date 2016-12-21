'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('./lib/cors-middleware.js');
const error = require('./error-middleware.js');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(cors);
app.use(error);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
