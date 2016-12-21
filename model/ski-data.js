'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug');

const SkiData = module.exports = function(location, rating) {
  debug('SkiData Constructor');

  if(!location) throw createError(400, 'bad request - expected location');
  if(!rating) throw createError(400, 'bad request - expected rating');

  this.id = uuid.v1();
  this.location = location;
  this.rating = rating;
};
