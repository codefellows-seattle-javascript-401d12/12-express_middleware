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

BEV.createVehicle = function(_newBEV) {
  debug('createVehicle');

  try {
    let newBEV = new BEV(_newBEV.vehicle, _newBEV.info, _newBEV.range, _newBEV.mpge);
    return storage.createEntry('bev', newBEV)
  } catch (err) {
    return Promise.reject(createError(400, err.message));
  };
};

BEV.retrieveVehicle = function(id) {
  debug('retrieveVehicle');

  try {
    return storage.retrieveEntry('bev', id);
  } catch (err) {
    return Promise.reject(createError(404, err.message));
  };
};

BEV.updateVehicle = function(id, _bev) {
  debug('updateVehicle');

  return storage.retrieveEntry('bev', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( bev => {
    for (var prop in bev) {
      if (prop === 'id') continue;
      if (_bev[prop]) bev[prop] = _bev[prop];
    };
    return storage.createEntry('bev', bev);
  });
};

BEV.deleteVehicle = function(id) {
  debug('deleteVehicle');
  return storage.deleteEntry('bev', id);
};

BEV.retrieveAllVehicleIDs = function() {
  debug('retrieveAllVehicleIDs');
  return storage.retrieveAll('bev');
};
