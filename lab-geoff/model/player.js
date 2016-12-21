'use strict';

const createError = require('http-errors');
const debug = require('debug')('mnp:player');
const storage = require('../lib/storage.js');

const Player = module.exports = function(name, email) {
  debug('Player() constructor');

  if(!name || name.length === 0) throw createError(400, 'invalid name');
  if(!email || email.length === 0) throw createError(400, 'invalid email');
  //TODO: Assert email matches email regex.

  this.name = name;
  this.email = email;
};

Player.create = function(_player) {
  debug('Player.create()', _player);
  try {
    let player = new Player(_player.name, _player.email);
    return storage.createItem('player', player);
  } catch (err) {
    return Promise.reject(createError(400, err.message));
  }
};

Player.update = function(id, player) {
  debug('Player.update()', id, player);
  return storage.updateItem('player', id, player);
};

Player.fetch = function(id) {
  debug('Player.fetch()', id);
  return storage.fetchItem('player', id);
};

Player.delete = function(id) {
  debug('Player.delete()', id);
  return storage.deleteItem('player', id);
};

Player.list = function() {
  debug('Player.list()');
  return storage.listItems('player');
};
