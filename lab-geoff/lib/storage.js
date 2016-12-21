'use strict';

const uuid = require('node-uuid');
const Promise = require('bluebird');
const createError = require('http-errors');
const debug = require('debug')('mnp:storage');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createItem = function(collection, item) {
  debug('createItem()', item);
  if(!collection) return Promise.reject(createError(400, 'collection name not supplied'));
  if(!item) return Promise.reject(createError(400, 'missing item to create'));

  item.id = item.id || uuid.v4().slice(0,8);

  let json = JSON.stringify(item);
  return fs.writeFileProm(`./data/${collection}/${item.id}.json`, json)
  .then( () => item)
  .catch( err => Promise.reject(createError(500, err.message)));
};

exports.fetchItem = function(collection, id) {
  debug('fetchItem()', collection, id);
  if(!collection) return Promise.reject(createError(400, 'collection name not supplied'));
  if(!id) return Promise.reject(createError(400, 'missing id'));

  return fs.readFileProm(`./data/${collection}/${id}.json`)
  .then( data => {
    let item = JSON.parse(data.toString());
    return item;
  })
  .catch( err => Promise.reject(createError(404, err.message)));
};

exports.deleteItem = function(collection, id) {
  debug('deleteItem()', collection, id);
  if(!collection) return Promise.reject(createError(400, 'collection name not supplied'));
  if(!id) return Promise.reject(createError(400, 'missing id'));

  return fs.unlinkProm(`./data/${collection}/${id}.json`)
  .catch( err => Promise.reject(createError(404, err.message)));
};

exports.updateItem = function(collection, id, _item) {
  debug('updateItem()',collection,id,_item);
  if(!collection) return Promise.reject(createError(400, 'collection name not supplied'));
  if(!id) return Promise.reject(createError(400, 'missing id'));

  return this.fetchItem(collection, id)
  .then( item => {
    for(let prop in item) {
      if(prop === 'id') continue;
      if(_item[prop]) item[prop] = _item[prop];
    }
    // Calling createItem seems weird here, but we are essentially
    // just overwriting the object that was there.
    return this.createItem(collection, item);
  })
  .catch( err => Promise.reject(createError(404, err.message)));
};

exports.listItems = function(collection) {
  debug('listItems()');
  return fs.readdirProm(`./data/${collection}`)
  .then( files => files
  .filter( name => name !== '.keep')
  .map(name => name.split('.json')[0]))
  .catch( err => Promise.reject(createError(404, err.message)));
};
