'use strict';

module.exports = function(request, response, next) {
  response.append('Access-Control-Allow-Origin', '*');
  response.append('Access-Control-Allow-Headers', '*');
  next();
};
