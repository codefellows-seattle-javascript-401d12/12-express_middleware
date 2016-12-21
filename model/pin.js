'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('pin:pin');
const storage = require('../lib/storage.js');

const Pin = module.exports = function(title, skill) {
  debug('pin constructor');

  if (!title) throw createError(400, 'expected title');
  if (!skill) throw createError(400, 'expected skill');

  this.id = uuid.v1();
  this.title = title;
  this.skill = skill;
};
