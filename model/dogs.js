'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('dogs:dogs');
const storage = require('../lib/storage.js');

const Dog = module.exports = function(name, breed, color) {
  debug('dog constructor');

  if(!name) throw createError(404, 'expected name');
  if(!breed) throw createError(404, 'expected breed');
  if(!color) throw createError(404, 'expected color');

  this.id = uuid.v1();
  this.name = name;
  this.breed = breed;
  this.color = color;
};

Dog.createDog = function(_dog) {
  debug('createDog');

  try {
    let dog =  new Dog(_dog.name, _dog.breed, _dog.color);
    return storage.createItem('dog', dog);
  } catch(err) {
    return Promise.reject(err);
  }
};

Dog.fetchDog = function(id) {
  debug('fetchDog');
  return storage.fetchItem('dog', id);
};

Dog.updateDog = function(id, _dog) {
  debug('updateDog');

  return storage.fetchDog('dog', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( dog => {
    for(var prop in dog) {
      if(prop === 'id') continue;
      if(_dog[prop]) dog[prop] = _dog[prop];
    }
    return storage.createItem('dog', dog);
  });
};

Dog.deleteDog = function(id) {
  debug('deleteDog');

  return storage.deleteItem('dog',id);
};

Dog.fetchIDs = function() {
  debug('fetchIDs');

  return storage.availIDs('dog');
};
