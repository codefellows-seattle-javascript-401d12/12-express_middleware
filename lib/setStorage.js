'use strict';

const debug = require('debug')('ski:setStorage');
const createError = require('http-errors');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const file = `${__dirname}/../data`;

module.exports = exports = {};

exports.createDataFile = function(schemaName, item) {
  debug('createDataFile');

  if(!schemaName) return Promise.reject(createError(400, 'bad request - expected schemaName'));
  if(!item) return Promise.reject(createError(400, 'bad request - expected item'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${file}/${schemaName}/${item.id}.json`, json)
    .then( () => item)
    .catch( err => Promise.reject(createError(500, err.message)));
};

exports.getDataFile = function(schemaName, id) {
  debug('getDataFile');

  if(!id) return Promise.reject(createError(400, 'bad request - expected id'));
  if(!schemaName) return Promise.reject(createError(400, 'bad request - expected schemaName'));

  return fs.readFileProm(`${file}/${schemaName}/${id}.json`)
    .then( skiData => {
      let data = JSON.parse(skiData.toString());
      return data;
    })
    .catch( err => Promise.reject(createError(404, err.message)));
};

exports.deleteDataFile = function(schemaName, id) {
  debug('deleteDataFile');

  if(!schemaName) return Promise.reject(createError(400, 'bad request - expected schemaName'));
  if(!id) return Promise.reject(createError(400, 'bad request - expected id'));

  return fs.unlinkProm(`${file}/${schemaName}/${id}.json`)
    .catch( err => Promise.reject(createError(404, err.message)));
};

exports.getAllDataFiles = function(schemaName) {
  debug('getAllDataFiles');

  if(!schemaName) return Promise.reject(createError(400, 'bad request - expected schemaName'));

  return fs.readdirProm(`${file}/${schemaName}`)
    .then( data => data.map( name => name.split('.json')[0]))
    .catch( err => Promise.reject(createError(404, err.message)));
};
