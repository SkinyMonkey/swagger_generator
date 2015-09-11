'use strict';

var _ = require('lodash');
var generate = require('./generate.js');

exports.fromDefinition = function (definition, result, context, generator) {
  var properties = definition.properties;
 
  for (var property_name in properties) {
    context.property_name = property_name;
    context.properties = properties;

    var generated_value = generate.property(properties, property_name, context, generator);
    generated_value = generator.hook('property', generated_value, context);

    result[property_name] = generated_value;
  }
  return (result);
}

exports.fromDefinitionPath = function (body, field, result, context, generator) {
  var full_path = body[field]['$ref'];

  context.definition_name = _.last(full_path.split('/'));
  context.definition = context.swagger_spec.definitions[context.definition_name];

  var intermediate_context = {
    swagger_spec: context.swagger_spec,
    definition_name: context.definition_name
  };

  return exports.fromDefinition(context.definition, result, intermediate_context, generator);
}
