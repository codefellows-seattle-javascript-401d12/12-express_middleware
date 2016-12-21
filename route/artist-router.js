'use strict';

const Router = require('express').Router;
const jsonParser = require('body-parser').json();
const debug = require('debug')('artist:artist-router.js');
const Artist = require('../model/artist.js');
const artistRouter = new Router();

artistRouter.post('/api/artist', jsonParser, function(req, res, next) {
  debug('POST: /api/artist');

  Artist.createArtist(req.body)
  .then( artist => res.json(artist))
  .catch( err => next(err));
});

artistRouter.get('/api/artist/:id', function(req, res, next) {
  debug('GET: /api/artist/:id');

  Artist.fetchArtist(req.params.id)
  .then( artist => res.json(artist))
  .catch( err => next(err));
});

artistRouter.get('/api/artist', function(req, res, next) {
  debug('GET: api/artist');

  Artist.fetchIDs()
  .then( ids => res.json(ids))
  .catch(next);
});

artistRouter.put('/api/artist', jsonParser, function(req, res, next) {
  debug('PUT: /api/artist');

  Artist.updateArtist(req.query.id, req.body)
  .then( artist => res.json(artist))
  .catch(next);
});

module.exports = artistRouter;
