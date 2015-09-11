var _ = require('lodash');
var display = require('../display.js');

var original_definition_name = null;

function randomIntInc (low, high) {
  return Math.floor(Math.random() * (high - low + 1) + low);
}

module.exports = {
  from: 'paths',
  hooks:{
    property: function(generated_property, context) {
      if (!original_definition_name)
        original_definition_name = context.definition_name;

      return (generated_property);
    },
    end: function (result, context) {
      var definition = context.swagger_spec.definitions[original_definition_name];
      var chance = 0;

      _.each(result, function (property, property_name) {
        chance = randomIntInc(0, 100);
        if (definition.required && !definition.required.indexOf(property_name)) {
          if (chance > 50)
            delete result[property_name];
        }
      });      
      display.json(result);
      return (true);
    }
  }
}
