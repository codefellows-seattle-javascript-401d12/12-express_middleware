'use strict';

const express = require('express');
const debug = require('debug')('ski:server');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan('dev'));

app.listen(PORT, () => {
  debug(`Server up: ${PORT}`);
});
