'use strict';

const uuid = require('node-uuid');
const debug = require('debug')('student:constructor');
const createError = require('http-errors');
const storage = require('../lib/storage.js');

const Student = module.exports = function(student) {
  debug('Student constructor.');

  if (!student.name) throw createError(400, 'Expected a name field.');
  if (!student.age) throw createError(400, 'Expected an age field.');

  this.id = uuid.v1();
  for (var key in student) {
    this[key] = student[key];
  }
};

Student.createStudent = function(student) {
  debug('Student constructor: createStudent method.');
  return storage.createItem('student', new Student(student));
};

Student.readStudent = function(id) {
  debug('Student constructor: readStudent method.');
  return storage.readItem('student', id);
};

Student.updateStudent = function(id, content) {
  debug('Student constructor: updateStudent method.');
  return storage.updateItem('student', id, content);
};
