'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('artist:artist');
const storage = require('../lib/storage.js');

const Note = module.exports = function(name, genre) {
  debug('artist constructor');

  if(!name) throw createError(400, 'expected name');
  if(!genre) throw createError(400, 'expected genre');

  this.id = uuid.v2();
  this.name = name;
  this.genre = genre;

};
