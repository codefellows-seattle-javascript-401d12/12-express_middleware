'use strict';

const uuid = require('node-uuid');
const createError = require('http-errors');
const debug = require('debug')('note:note');
const storage = require('../lib/diskStorage.js');

const Note = module.exports = function(name, content) {
  debug('Note constructor');

  if (!name) throw createError(400, 'expected name');
  if (!content) throw createError(400, 'expected content');

  this.id = uuid.v1();
  this.name = name;
  this.content = content;
};

Note.createNote = function(_note) {
  debug('createNote method');

  try {
    let note = new Note(_note.name, _note.content);
    return storage.storeItem('note', note);
    //console.log(newNote);
    //return newNote;
  } catch (err) {
    return Promise.reject(err);
  }
};

Note.fetchNote = function(id) {
  debug('fetchNote method');

  return storage.fetchItem('note', id);
};

Note.updateNote = function(id, _note) {
  debug('updateNote method');

  return storage.fetchItem('note', id)
  .catch( err => Promise.reject(createError(404, err.message)))
  .then( note => {

    for (var prop in note) {
      if (prop === 'id') continue;
      if (_note[prop]) note[prop] = _note[prop];
    }
    return storage.storeItem('note', note);
  });
};

Note.deleteNote = function(id) {
  debug('deleteNote method');

  return storage.deleteItem('note', id);
};

Note.enumerate = function() {
  debug('enumerate method');

  return storage.enumerate('note');
};
