'use strict';

const uuid = require('node-uuid');
const Promise = require('bluebird');
const createError = require('http-errors');
//TODO: Use debug
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

module.exports = exports = {};

exports.createItem = function(collection, item) {
  if(!collection) return Promise.reject(createError(400, 'collection name not supplied'));
  if(!item) return Promise.reject(createError(400, 'missing item to create'));

  item.id = item.id || uuid.v4().slice(0,8);

  let json = JSON.stringify(item);
  return fs.writeFileProm(`./data/${collection}/${item.id}.json`, json)
  .then( () => item)
  .catch( err => Promise.reject(createError(500, err.message)));
};

exports.fetchItem = function(collection, id) {
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
  if(!collection) return Promise.reject(createError(400, 'collection name not supplied'));
  if(!id) return Promise.reject(createError(400, 'missing id'));

  //TODO: Wrap the promise then and catch for better messaging?
  return fs.unlinkProm(`./data/${collection}/${id}.json`)
  .catch( err => Promise.reject(createError(404, err.message)));
};

exports.updateItem = function(collection, id, _item) {
  if(!collection) return Promise.reject(createError(400, 'collection name not supplied'));
  if(!id) return Promise.reject(createError(400, 'missing id'));

  return this.fetchItem(collection, id)
  .then( item => {
    for(let prop in item) {
      if(prop === 'id') continue;
      if(_item[prop]) item[prop] = _item[prop];
    }
    return this.cteateItem(collection, item);
  })
  .catch( err => Promise.reject(createError(404, err.message)));
};

exports.listItems = function(collection) {
  return fs.readdirProm(`./data/${collection}`)
  .then( files => files.map(name => name.split('.json')[0]))
  .catch( err => Promise.reject(createError(404, err.message)));
};
