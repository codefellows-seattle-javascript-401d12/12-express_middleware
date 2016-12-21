'use strict';

const express = require('express');
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 8080;

app.use(morgan('dev'));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
