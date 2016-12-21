'use strict';

const uuid = require('node-uuid');
const debug = require('debug')('student:constructor');
const createError = require('http-errors');

const Student = module.exports = function(student) {
  debug('Student constructor.');

  if (!student.name) throw createError(400, 'Expected a name field.');
  if (!student.age) throw createError(400, 'Expected an age field.');
  
  this.id = uuid.v1();
  for (var key in student) {
    this[key] = student[key];
  }
};
