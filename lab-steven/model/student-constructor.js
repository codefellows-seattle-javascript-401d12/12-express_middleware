'use strict';

const uuid = require('node-uuid');

const Student = module.exports = function(student) {
  this.id = uuid.v1();
  for (var key in student) {
    this[key] = student[key];
  }
};
