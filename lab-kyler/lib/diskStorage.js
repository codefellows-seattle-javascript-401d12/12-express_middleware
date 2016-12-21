'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');
const debug = require('debug')('note:storage');

module.exports = exports = {};

exports.storeItem = (schema, item) => {
  debug('storeItem');
  if (!schema) return Promise.reject(createError(400, 'expected schema'));
  if (!item || !item.id) return Promise.reject(createError(400, 'expected item/item id'));

  return fs.writeFileProm(`${__dirname}/../data/${schema}/${item.id}.json`, JSON.stringify(item))
  .then( () => item)
  .catch( err => Promise.reject(createError(500, err.message)));
};

exports.fetchItem = (schema, id) => {
  if (!schema) return Promise.reject(createError(400, 'expected schema'));
  if (!id) return exports.enumerate(schema);

  return fs.readFileProm(`${__dirname}/../data/${schema}/${id}.json`)
  .then (data => {
    try {
      return JSON.parse(data.toString());
    } catch (err) {
      return Promise.reject(createError(500, err.message));
    }
  })
  .catch ( () => Promise.reject(createError(404, 'not found')));
};

exports.enumerate = (schema) => {
  if (!schema) return Promise.reject(createError(400, 'expected schema'));

  return fs.readdirProm(`${__dirname}/../data/${schema}/`)
  .then( fileArray => {
    return fileArray.forEach(fileArray.map(name => name.split('.json')[0]));
  })
  .catch( err => Promise.reject(createError(404, err.message)));
};

exports.deleteItem = (schema, id) => {
  debug('deleteItem method');

  if (!schema) return Promise.reject(createError(400, 'expected schema'));
  if (!id) return Promise.reject(createError(400, 'expected id'));

  var path = `${__dirname}/../data/${schema}/${id}.json`;
  return fs.accessProm(path)
  .then( () => fs.unlinkProm(path))
  .catch(err => Promise.reject(createError(404, err.message)));
};
