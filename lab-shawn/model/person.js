'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('person:person');
const storage = require('../lib/storage.js');

const Person = module.exports = function(name, gender){
  debug('Person Constructor');

  if(!name) throw createError(400, 'expected name');
  if(!gender) throw createError(400, 'expected gender');

  this.id = uuid.v1();
  this.name = name;
  this.gender = gender;
};

Person.createPerson = function(_person){
  debug('createPerson');

  try{
    let person = new Person(_person.name, _person.gender);
    return storage.createInstance('person',person);
  }catch(err){
    return Promise.reject(createError(400, err.message));
  }
};

Person.fetchPerson = function(id){
  debug('fetchPerson');

  return storage.fetchInstance('person', id);
}

Person.updatePerson = function(id, _person){
  debug('updatePerson');

  return storage.fetchInstance('person', id)
  .catch(err => Promise.reject(createError(404, err.message)))
  .then( person => {
    for(var prop in person){
      if(prop === 'id') continue;
      if(_person[prop]) person[prop] = _person[prop];
    }
    return storage.createInstance('person', person);
  });
};

Person.deletePerson = function(id){
  debug('deletePerson');

  return storage.deleteInstance('person',id);
};

Person.fetchIDs = function(){
  debug('fetchIDs');

  return storage.availableIDs('person');
}
