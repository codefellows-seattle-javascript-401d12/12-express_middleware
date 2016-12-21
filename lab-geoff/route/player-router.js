'use strict';

const Router = require('express').Router;

const jsonParser = require('body-parser').json();
const debug = require('debug')('mnp:player-router');
const Player = require('../model/player.js');

const router = module.exports = new Router();

router.post('/api/player', function(req, res, next) {
  debug('POST: /api/player');
  Player.create(req.body)
  .then( player => res.json(player))
  .catch(next);
});

router.get('/api/player/:id', function(req, res, next) {
  debug('GET: /api/player/:id', req.params.id);
  Player.fetch(req.params.id)
  .then( player => res.json(player))
  .catch(next);
});

router.get('/api/player', function(req, res, next) {
  debug('GET /api/player');
  Player.list()
  .then( ids => res.json(ids))
  .catch(next);
});

router.put('/api/player/:id', function(req, res, next) {
  debug('PUT /api/player/:id');
  Player.update(req.params.id, req.body)
  .then( player => res.json(player))
  .catch(next);
});

router.delete('/api/player/:id', function(req, res, next) {
  debug('DELETE: /api/player/:id', req.params.id);
  Player.delete(req.params.id)
  .then( player => res.json(player)) //TODO: Do we need to res.status(204)?
  .catch(next);
});
