'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('hat:hat');
const storage = require('../lib/storage.js');

const Hat = module.exports = function(color, style) {
  debug('hat constructor');

  if (!color) throw createError(400, 'expected color');
  if (!style) throw createError(400, 'expected style');

  this.id = uuid.v1();
  this.color = color;
  this.style = style;
};

Hat.createHat = function(_hat) {
  debug('createHat');

  try {
    let hat = new Hat(_hat.name, _hat.style);
    return storage.createItem('hat', hat);
  } catch (err) {
    return Promise.reject(createError(400, 'err.message'));
  }
};

Hat.fetchHat = function(id) {
  debug('fetchHat');
  return storage.fetchItem('hat', id);
};

Hat.updateHat = function(id, _hat) {
  debug('updateHat');

  return storage.fetchItm('hat', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( hat => {
    for (var prop in hat) {
      if (prop === 'id') continue;
      if (_hat[prop]) hat[prop] = _hat[prop];
    }
    return storage.createItem('hat', hat);
  });
};

Hat.deleteHat = function(id) {
  debug('deleteHat');
  return storage.deleteItem('hat', id);
};

Hat.fetchIDs = function() {
  debug('fetchIDs');
  return storage.availIDs('hat');
};
