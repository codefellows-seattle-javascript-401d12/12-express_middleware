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

SkiData.getData = function(_id) {
  debug('getData');

  return setStorage.getDataFile('ski', _id);
};

SkiData.updateData = function(_id, _skiData) {
  debug('updateData');

  return setStorage.getDataFile('ski', _id)
    .then( skiData => {
      for(var prop in skiData) {
        if(prop === 'id') continue;
        if(_skiData[prop]) skiData[prop] === _skiData[prop];
      }
      return setStorage.createDataFile('ski', skiData);
    })
    .catch( err => Promise.reject(createError(404, err.message)));
};

SkiData.deleteData = function(_id) {
  debug('deleteData');

  return setStorage.deleteDataFile('ski', _id);
};

SkiData.getAllData = function() {
  debug('getAllData');

  return setStorage.getAllDataFiles('ski');
};
