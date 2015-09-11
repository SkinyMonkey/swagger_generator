'use strict';

var _ = require('lodash');
var fs = require('fs');
var yaml = require('js-yaml');
var from_swagger = require('./from_swagger.js');

var generator = require('./generator.js');

function main () {
  var swagger_spec_path = process.argv[2];
  var generator_path = process.argv[3];

  if (!swagger_spec_path || !generator_path) {
    console.log('node swagger_to_json.js SWAGGER_SPEC_PATH CONF_PATH');
    process.exit(-1);
  }

  var swagger_spec = yaml.safeLoad(fs.readFileSync(swagger_spec_path, 'utf8'));
  if (generator.from === 'definitions')
    from_swagger.definitions(swagger_spec, generator);
  else
    from_swagger.paths(swagger_spec, generator);
}

main();
