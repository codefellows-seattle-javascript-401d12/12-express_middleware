'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('artist:artist');
const storage = require('../lib/storage.js');

const Artist = module.exports = function(name, genre) {
  debug('artist constructor');

  if(!name) throw createError(400, 'expected name');
  if(!genre) throw createError(400, 'expected genre');

  this.id = uuid.v2();
  this.name = name;
  this.genre = genre;

};

Artist.createArtist = function(_artist) {
  debug('createArtist');

  try {
    let artist = new Artist(_artist.name, _artist.genre);
    return storage.createItem('artist', artist);
  } catch (err) {
    return Promise.reject(createError(400, err.message));
  }
};

Artist.fetchArtist = function(id) {
  debug('fetchArtist');

  return storage.fetchItem('artist', id);
};

Artist.updateArtist = function(id, _artist) {
  debug('updateArtist');

  return storage.fetchItem('artist', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( artist => {
    for (var prop in artist) {
      if (prop === 'id') continue;
      if (_artist[prop]) artist[prop] = _artist[prop];
    }
    return storage.createItem('artist', artist);
  });
};

Artist.deleteArtist = function(id) {
  debug('deleteArtist');

  return storage.deleteItem('artist', id);
};

Artist.fetchIDs = function() {
  debug('fetchIDs');

  return storage.availIDs('artist');
};
