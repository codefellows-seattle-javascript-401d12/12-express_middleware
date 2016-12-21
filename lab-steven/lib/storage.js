'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');
const debug = require('debug')('student:storage');

module.exports = exports = {};

exports.createItem = function(schemaName, item) {
  debug('Storage.js: createItem method.');

  if (!schemaName) throw createError(400, 'Expected a schema name.');
  if (!item) throw createError(400, 'Expected an item.');

  let stringifiedItem = JSON.stringify(item);
  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${item.id}.json`, stringifiedItem)
  .then(() => item)
  .catch(err => Promise.reject(createError(500, err.message)));
};

exports.readItem = function(schemaName, id) {
  debug('Storage.js: readItem method.');

  if (!schemaName) throw createError(400, 'Expected a schema name.');
  if (!id) throw createError(400, 'Expected an ID.');

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .then(data => JSON.parse(data.toString()))
  .catch(err => Promise.reject(createError(404, err.message)));
};
