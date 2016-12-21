'use strict';

const express = require('express');
const morgan = require('morgan');
const debug = require('debug');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('dev'));

app.listen(PORT, () => {
  debug(`Server running on port ${PORT}`);
});
