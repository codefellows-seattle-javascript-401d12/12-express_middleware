'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), { suffix: 'Prom' });
const createError = require('http-errors');
const debug = require('debug')('bev:storage');

module.exports = exports = {};

// schemaName usually === note in this example
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
    }
  })
  .catch( err => Promise.reject(createError(404, err.message)));
};
