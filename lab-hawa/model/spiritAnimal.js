'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('spiritAnimal:spiritAnimal');
const storage = require('../lib/storage.js');

const SpiritAnimal = module.exports = function(name, spiritAnimal, spiritAnimalName) {
  debug('spirit animal constructor');

  if (!name) throw createError(400, 'expected name');
  if (!spiritAnimal) throw createError(400, 'expected spirit animal');
  if (!spiritAnimalName) throw createError(400, 'expected favorite animal');

  this.id = uuid.v1();
  this.name = name;
  this.spiritAnimal = spiritAnimal;
  this.spiritAnimalName = spiritAnimalName;
};

SpiritAnimal.createSpiritAnimal = function (_spiritAnimal) {
  debug('createItem -- spiritAnimal.js');

  try {
    let spiritAnimal = new SpiritAnimal(_spiritAnimal.name, _spiritAnimal.spiritAnimal, _spiritAnimal.spiritAnimalName);
    return storage.createItem('spiritAnimal', spiritAnimal);
  } catch (err) {
    return Promise.reject(createError(400, err.message));
  }
};

SpiritAnimal.fetchSpiritAnimal = function(id) {
  debug('fetchSpiritAnimal');

  return storage.fetchItem('spiritAnimal', id);
};

SpiritAnimal.updateSpiritAnimal = function(id, _spiritAnimal) {
  debug('updateSpirtAnimal');

  return storage.fetchItem('spiritAnimal', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( spiritAnimal => {
    for (var prop in spiritAnimal) {
      if (prop === 'id') continue;
      if(_spiritAnimal[prop]) spiritAnimal[prop] = _spiritAnimal[prop];
    }
    return storage.createItem('spiritAnimal', spiritAnimal);
  });
};

SpiritAnimal.deleteSpiritAnimal = function(id) {
  debug('deleteSpiritAnimal');

  return storage.deleteItem('spiritAnimal', id);
};

SpiritAnimal.fetchIDs = function() {
  debug('fetchIDs');

  return storage.availIDs('spiritAnimal');
};
