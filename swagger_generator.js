'use strict';

var _ = require('lodash');
var fs = require('fs');
var from_swagger = require('./from_swagger.js');
var rp = require('request-promise');

var generator = require('./generator.js');

function main () {
  rp('http://api4-develop.tactill.com:3000/docs')
    .then(function (swagger_spec) {
      swagger_spec = JSON.parse(swagger_spec);

      if (generator.from === 'definitions')
        from_swagger.definitions(swagger_spec, generator);
      else
        from_swagger.paths(swagger_spec, generator);
    })
    .catch(function (error) {console.error(error)});
}

main();
