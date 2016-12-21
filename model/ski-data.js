'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('ski:ski-data');
const setStorage = require('../lib/setStorage.js');

const SkiData = module.exports = function(location, rating) {
  debug('SkiData Constructor');

  if(!location) throw createError(400, 'bad request - expected location');
  if(!rating) throw createError(400, 'bad request - expected rating');

  this.id = uuid.v1();
  this.location = location;
  this.rating = rating;
};


SkiData.createData = function(_skiArea) {
  debug('createData');

  try {
    let skiArea = new SkiData(_skiArea.location, _skiArea.rating);
    return setStorage.createDataFile('ski', skiArea);
  } catch (err) {
    return Promise.reject(createError(400, err.message));
  }
};

//TODO: set up getData function

//TODO: set up updateData function

//TODO: set up deleteData function

//TODO: set up get all data function
