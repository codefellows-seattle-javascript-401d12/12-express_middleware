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
  .then(() => student)
  .catch(err => Promise.reject(createError(400, err.message)));
};
