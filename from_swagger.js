'use strict';

var _ = require('lodash');
var dict = require('./dict.js');
var display = require('./display.js');

exports.definitions = function (swagger_spec, generator) {
  _.each(swagger_spec.definitions, function (definition, definition_name) {
    var context = {'swagger_spec': swagger_spec,
                   'definition_name': definition_name,
                   'definition': definition};

    var result = generator.hook('start', {}, context);

    result = dict.fromDefinition(definition, result, context, generator);

    if (generator.hook('end', result, context) === result)
      display.json(result);
  });
}

exports.paths = function (swagger_spec, generator) {
  _.each(swagger_spec.paths, function (path_content, path) {
    _.each(path_content, function (verb_content, verb) {
      if (verb.slice(0, 2) == 'x-')
        return;

      var body = _.find(verb_content.parameters, 'in', 'body');

      if (body) {
        var context = {'swagger_spec': swagger_spec,
                       'verb': verb,
                       'path': path};

        var result = generator.hook('start', {}, context);

        result = dict.fromDefinitionPath(body, 'schema', result, context, generator);

        if (generator.hook('end', result, context) === result)
          display.json(result);
      }
    });
  });
}
