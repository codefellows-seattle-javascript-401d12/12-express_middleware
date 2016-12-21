'use strict';

const Router = require('express').Router;
const parseJSON = require('body-parser').json();
const debug = require('debug')('student:router');
const Student = require('../model/student-constructor.js');
const studentRouter = new Router();

studentRouter.post('/api/student', parseJSON, (request, response, next) => {
  debug('Student router POST: /api/student');

  Student.createStudent(request.body)
  .then(student => response.json(student))
  .catch(next);
});

studentRouter.get('/api/student/:id', (request, response, next) => {
  debug('Student router GET: /api/student/:id');

  Student.readStudent(request.params.id)
  .then(student => response.json(student))
  .catch(next);
});

studentRouter.get('/api/student', (request, response, next) => {
  debug('Student router GET: /api/student');

  Student.readAllStudents()
  .then(arrayOfFiles => response.json(arrayOfFiles))
  .catch(next);
});

studentRouter.put('/api/student/:id', parseJSON, (request, response, next) => {
  debug('Student router PUT: /api/student/:id');

  Student.updateStudent(request.params.id)
  .then(student => response.json(student))
  .catch(next);
});

studentRouter.delete('/api/student/:id', (request, response, next) => {
  debug('Student router DELETE: /api/student/:id');

  Student.deleteStudent(request.params.id)
  .catch(next);
});
