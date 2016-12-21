'use strict';

const debug = require('debug')('note:storage');
const createError = require('http-errors');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix : 'Prom'});


module.exports = exports = {};

exports.write = function(schemaName, _note){
  debug('storage:write');

  if(!_note) throw createError(400, 'note expected');
  if(!schemaName) throw createError(400, 'schemaName expected');

  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${_note.id}`, JSON.stringify(_note))
    .then( () => _note)
    .catch( err => Promise.reject(createError(500, err.message)));
};

exports.read = function(id){
  debug('storage:read');

  if(!id) throw createError(400, 'id expected');

  return fs.readFileProm(`${__dirname}/../data/note/${id}`)
  .then(note => JSON.parse(note.toString()))
  .catch( err => Promise.reject(createError(404, err.message)));
};

exports.availIDs = function(){
  debug('storage:availIDs');

  return fs.readdirProm('${__dirname}/../data/note')
 .then( files => files)
 .catch( err => Promise.reject(createError(500, err.message)));
};

exports.delete = function(id){
  debug('storage:delete');

  if(!id) throw createError(400, 'id expected');

  return fs.unlinkProm(`${__dirname}/../data/note/${id}`)
  .then( () => Promise.resolve('Item deleted!!'))
  .catch( err => Promise.reject(createError(500, err.message)));
};
