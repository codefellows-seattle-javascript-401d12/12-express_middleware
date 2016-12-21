'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('artist:artist');
const artist_storage = require('../lib/artist_storage.js');


const Artist = module.exports = function(name, genre, topHits) {
  debug('artist constructor');

  if(!name) throw createError(400, 'expected name');
  if(!genre) throw createError(400, 'expected a genre');
  if(!topHits) throw createError(400, 'expected top hits');

  this.id = uuid.v1();
  this.name = name;
  this.genre = genre;
  this.topHits = topHits;
};

Artist.newArtist = function(_artist) {
  debug('newArtist');

  try {
    let artist = new Artist(_artist.name, _artist.genre, _artist.topHits);
    return artist_storage.newArtist('artist', artist);
  }
  catch(err) {
    return Promise.reject(createError(400, err.message));
  };
};

Artist.getArtist = function(id) {
  debug('getArtist');
  return artist_storage.getArtist('artist', id);
};

Artist.updateArtist = function(id, _artist) {
  debug('updateArtist');

  return artist_storage.getArtist('artist', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( artist => {
    for(var prop in artist) {
      if(prop === 'id') continue;
      if(_artist[prop]) artist[prop] = _artist[prop];
    };
    return artist_storage.newArtist('artist', artist);
  });
};

Artist.deleteArtist = function(id) {
  debug('deleteArtist');
  return artist_storage.deleteArtist('artist', id);
};

Artist.allIDs = function() {
  debug('allIDs');
  return artist_storage.allIDs('artist');
};
