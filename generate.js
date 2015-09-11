'use strict';

var md5 = require('md5');
var dict = require('./dict.js');

function randomDate(start, end) {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomIntInc (low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}

function defaultArray(cb, generator) {
  var index = 0;
  var res = [];

  if (generator.array) {
    if (generator.array.size)
      var end = generator.array.size
    else
      var end = randomIntInc(generator.array.min || 0, generator.array.max || 1);
  }
  else
    var end = 1;

  while (index < end) {
    res.push(cb());
    index += 1;
  }
  return (res);
}

function simpleTypes(properties, property_name, subkey) {
  var property = properties[property_name];
  var type = '';

  if (subkey)
    type = property[subkey].type;
  else
    type = property.type;

  switch (type) {
    case 'boolean':
      return true // FIXME : randomize it

    case 'string':
        if (property.format == 'date')
          // FIXME : return date only?
          return randomDate(new Date(2012, 0, 1), new Date())
        else if (property.format == 'date-time')
          // FIXME : return time only?
          return randomDate(new Date(2012, 0, 1), new Date())

        else if (property.enum && property.enum instanceof Array){
          var enum_ = property.enum;
          return enum_[Math.floor(Math.random() * enum_.length)];
        }
        else 
          return md5(Math.random());

    case 'integer':
        return randomIntInc(-10000, 10000); // FIXME : from generator
  }
  return 'FIXME : type == ' + type;
}

exports.array = function (property_name, properties, context, generator) {
  var property = properties[property_name];
  var cb = null;

  if (property.items['$ref'])
    cb = function() {
      return dict.fromDefinitionPath(property, 'items', {}, context, generator);
    };
  else
    cb = function() {
      return simpleTypes(properties, property_name, 'items');
    };

  context.cb = cb;
  var generated_array = defaultArray(cb, generator);

  generated_array = generator.hook('array', generated_array, context);

  return (generated_array);
}

exports.property = function (properties, property_name, context, generator) {
  var property = properties[property_name];

  switch (property.type) {
    case 'boolean':
    case 'string':
    case 'integer':
      return simpleTypes(properties, property_name);

    case 'array':
      return exports.array(property_name, properties, context, generator);

    default:
      console.error('Unkwnown type : ' + property.type);
      process.exit(-1);
  }
}
