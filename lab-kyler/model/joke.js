'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('joke:joke');
const storage = require('../lib/diskStorage.js');

const Joke = module.exports = function(setup, punchline) {
  debug('Joke constructor');

  if (!setup) throw createError(400, 'expected setup');
  if (!punchline) throw createError(400, 'expected punchline');

  this.id = uuid.v1();
  this.setup = setup;
  this.punchline = punchline;
};

Joke.createJoke = function(_joke) {
  debug('createJoke method');

  try {
    let joke = new Joke(_joke.setup, _joke.punchline);
    return storage.storeItem('joke', joke);
    //console.log(newJoke);
    //return newJoke;
  } catch (err) {
    return Promise.reject(err);
  }
};

Joke.fetchJoke = function(id) {
  debug('fetchJoke method');

  return storage.fetchItem('joke', id);
};

Joke.updateJoke = function(id, _joke) {
  debug('updateJoke method');

  return storage.fetchItem('joke', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( joke => {

    for (var prop in joke) {
      if (prop === 'id') continue;
      if (_joke[prop]) joke[prop] = _joke[prop];
    }
    return storage.storeItem('joke', joke);
  });
};

Joke.deleteJoke = function(id) {
  debug('deleteJoke method');

  return storage.deleteItem('joke', id);
};

Joke.enumerate = function() {
  debug('enumerate method');

  return storage.enumerate('joke');
};
