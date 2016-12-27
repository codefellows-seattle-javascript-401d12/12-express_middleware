'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('bev:bev');
const storage = require('../lib/storage.js');

const BEV = module.exports = function(vehicle, info, range, mpge) {
  debug('vehicle data model');

  if (!vehicle) throw createError(400, 'expected vehicle data');
  if (!info) throw createError(400, 'expected vehicle info');
  if (!range) throw createError(400, 'expected vehicle range data')
  if (!mpge) throw createError(400, 'expected vehicle MPGe data')
  if (isNaN(range) || isNaN(mpge)) throw createError(400, 'expected a number');

  this.id = uuid.v1();
  this.vehicle = vehicle;
  this.info = info;
  this.range = range;
  this.mpge = mpge;
};

BEV.createVehicle = function(_vehicle) {
  debug('createVehicle');

  // TODO: build out createVehicle functionality
};

BEV.retrieveVehicle = function(id) {
  debug('retrieveVehicle');

  // TODO: build out retrieveVehicle functionality
};
