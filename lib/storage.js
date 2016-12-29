'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });
const createError = require('http-errors');
const debug = require('debug')('bev:storage');

module.exports = exports = {};

exports.createEntry = function(schemaName, entry) {
  debug('createEntry');

  if (!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if (!entry) return Promise.reject(createError(400, 'expected entry data'));

  let json = JSON.stringify(entry);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${entry.id}.json`, json)
  .then( () => entry)
  .catch( err => Promise.reject(createError(500, err.message)));
};

exports.retrieveEntry = function(schemaName, id) {
  debug('retrieveEntry');

  if (!schemaName) return reject(createError(400, 'expected schema name'));
  if (!id) return reject(createError(400, 'expected entry id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then( data => {
    try {
      let entry = JSON.parse(data.toString());
      return entry;
    } catch (err) {
      return Promise.reject(createError(500, err.message));
    };
  })
  .catch( err => Promise.reject(createError(404, err.message)));
};

exports.deleteEntry = function(schemaName, id) {
  debug('deleteEntry');

  if (!schemaName) return reject(createError(400, 'expected schema name'));
  if (!id) return reject(createError(400, 'expected id'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .catch( err => Promise.reject(createError(404, err.message)));
};

exports.retrieveAll = function(schemaName) {
  debug('retrieveAll');

  if (!schemaName) return Promise.reject(createError(400, 'expected schemaName'));

  return fs.readdirProm(`${__dirname}/../data/${schemaName}`)
  .then( files => files.map(fileID => fileID.split('.json')[0]))
  .catch( err => Promise.reject(createError(404, err.message)));
};
