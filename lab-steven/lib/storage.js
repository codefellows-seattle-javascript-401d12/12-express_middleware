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

exports.updateItem = function(schemaName, id, content) {
  debug('Storage.js: updateItem method.');

  if (!schemaName) throw createError(400, 'Expected a schema name.');
  if (!id) throw createError(400, 'Expected an ID.');
  if (Object.keys(content).length < 1) throw createError(400, 'Expected content to update with.');

  return exports.readItem(schemaName, id)
  .then(student => {
    for (var key in content) {
      if (key === 'id') continue;
      student[key] = content[key];
    }
    return exports.createItem(schemaName, student);
  })
  .catch(err => Promise.reject(createError(404, err.message)));
};

exports.deleteItem = function(schemaName, id) {
  debug('Storage.js: deleteItem method.');

  if (!schemaName) throw createError(400, 'Expected a schema name.');
  if (!id) throw createError(400, 'Expected an ID.');

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
  .catch(err => Promise.reject(createError(404, err.message)));
};

exports.readAllItems = function(schemaName) {
  if (!schemaName) throw createError(400, 'Expected a schema name.');

  return fs.readdirProm(`${__dirname}/../data/${schemaName}`)
  .then(arrayOfFiles => Promise.resolve(arrayOfFiles.filter(element => element !== '.gitkeep').map(element => element.split('.json')[0])))
  .catch(err => Promise.reject(createError(500, err.message)));
};
