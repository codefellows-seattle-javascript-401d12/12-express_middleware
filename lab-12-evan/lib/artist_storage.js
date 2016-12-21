'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom'});
const createError = require('http-errors');
const debug = require('debug')('artist:artist_storage');

module.exports = exports = {};

exports.newArtist = function(schemaName, artist) {
  debug('newArtist');

  if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if(!artist) return Promise.reject(createError(400, 'expected an artist'));

  let json = JSON.stringify(artist);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${artist.id}.json`, json)
  .then( () => artist)
  .catch( err => Promise.reject(createError(500, err.message)));
};

exports.getArtist = function(schemaName, id) {
  debug('getArtist');

  if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if(!id) return Promise.reject(createError(400, 'expected an id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then( data => {
    try {
      let artist = JSON.parse(data.toString())
      return artist;
    }
    catch(err) {
      return Promise.reject(createError(500, err.message));
    }
  })
  .catch( err => Promise.reject(createError(404, err.message)));
};

exports.deleteArtist = function(schemaName, id) {
  debug('deleteArtist');

  if(!schemaName) return Promise.reject(createError(400, 'expected a schema name'));
  if(!id) return Promise.reject(createError(400, 'expected an id'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .catch( err => Promise.reject(createError(404, err.message)));
};

exports.allIDs = function(schemaName) {
  return fs.readdirProm(`${__dirname}/../data/${schemaName}`)
  .then( files => files.map( name => name.split('.json')[0]))
  .catch( err => Promise.reject(createError(404, err.message)));
};
