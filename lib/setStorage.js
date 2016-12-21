'use strict';

const debug = require('debug')('ski:setStorage');
const createError = require('http-errors');
const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const file = `${__dirname}/../data`;

module.exports = exports = {};

exports.createDataFile = function(schemaName, item) {
  debug('createDataFile');

  if(!schemaName) return Promise.reject(createError(400, 'bad request - expected schemaName'));
  if(!item) return Promise.reject(createError(400, 'bad request - expected item'));

  let json = JSON.stringify(item);
  return fs.writeFileProm(`${file}/${schemaName}/${item.id}.json`, json)
    .then( () => item)
    .catch( err => Promise.reject(createError(500, err.message)));
};


//TODO: set up getDataFile function

//TODO: set up deleteDataFile function

//TODO: set up availableIds function
