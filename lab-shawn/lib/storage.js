'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'),{suffix: 'Prom'});
const createError = require('http-errors');
const debug = require('debug')('person:storage');


module.exports = exports = {};

exports.createInstance = function(schemaName, person){
  debug('createInstance');

  if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if(!person) return Promise.reject(createError(400, 'expected a person'));

  let json = JSON.stringify(person);

  return fs.writeFileProm(`${__dirname}/../data/${schemaName}/${person.id}.json`,json)
  .then( () => person )
  .catch( err => Promise.reject(createError(404,err.message)));
};

exports.fetchInstance = function(schemaName,id){
  debug('fetchInstance');

  if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if(!id) return Promise.reject(createError(400, 'expected an id'));

  return fs.readFileProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .then( data => {
      try{
        let person = JSON.parse(data.toString());
        return person;
      }catch(err){
        return Promise.reject(createError(500,err.message));
      }
    })
    .catch(err => Promise.reject(createError(404,err.message)));
};

exports.deleteInstance = function(schemaName,id){
  debug('deleteInstance');

  if(!schemaName) return Promise.reject(createError(400, 'expected schema name'));
  if(!id) return Promise.reject(createError(400, 'expected id'));

  return fs.unlinkProm(`${__dirname}/../data/${schemaName}/${id}.json`)
    .catch(err => Promise.reject(createError(404,err.message)));
};

exports.availableIDs = function(schemaName){
  debug('availableIDs');

  if(!schemaName) return Promise.reject(createError(400,'expected schema name'));
  return fs.readDirProm(`${__dirname}/../data/${schemaName}`)
  .then(files => files.map(person => person.split('.json')[0]))
  .catch( err => Promise.reject(createError(404,err.message)));
}
