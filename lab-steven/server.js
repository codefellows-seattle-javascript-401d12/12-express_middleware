'use strict';

const express = require('express');
const morgan = require('morgan');
const app = express();
const cors = require('./lib/cors-middleware.js');
const error = require('./lib/error-middleware.js');
const studentRouter = require('./route/student-router.js');
const PORT = process.env.PORT || 8080;

app.use(morgan('dev'));
app.use(studentRouter);
app.use(cors);
app.use(error);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
