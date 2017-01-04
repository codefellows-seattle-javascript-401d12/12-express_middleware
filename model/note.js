'use strict';

const uuid = require('node-uuid');
const storage = require('../lib/storage.js');
const debug = require('debug')('note:note constructor');
const createError = require('http-errors');



const Note = module.exports = function(name, content){
  debug('Note constructor');

  if(!name) throw createError(400, 'expects name');
  if(!content) throw createError(400, 'expects content');

  this.id = uuid.v1();
  this.name = name;
  this.content = content;
};

Note.createNote = function(_note){
  debug('createNote function');

  if(!_note) throw createError(400, 'note expected!');

  try{
    let note = new Note(_note.name, _note.content);
    return storage.write('note', note);
  } catch (err) {
    return Promise.reject(createError(400, err.message));
  }

};

Note.read = function(id){
  debug('note:read');

  if(!id) throw createError(400, 'id expected!');
  return storage.read(id)
  .then( note => note )
  .catch( err => Promise.reject(createError(500, err.message)));
};

Note.update = function(_note){
  debug('note:update');

  if(!_note) throw createError(400, 'note expected');
  if(!_note.id) throw createError(400, 'id expected!');

  return storage.write('note', _note)
  .then(() => _note)
   .catch( err => Promise.reject(createError(500, err.message)));
};
Note.availIDs = function(){
  debug('note:availIDs');

  return storage.availIDs()
  .then(arr => arr)
  .catch( err => Promise.reject(createError(500, err.message)));
};

Note.delete = function(id){
  debug('note:delete');

  if(!id) throw createError(400, 'id expected');

  return storage.delete(id)
  .then( msg => msg )
  .catch( err => Promise.reject(createError(500, err.message)));
};
