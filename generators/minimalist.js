var _ = require('lodash');
var display = require('../display.js');

var original_definition_name = null;

module.exports = {
  hooks: {
    property: function(generated_property, context) {
      if (!original_definition_name)
        original_definition_name = context.definition_name;

      return (generated_property);
    },
    end: function (result, context) {
      var definition = context.swagger_spec.definitions[original_definition_name];

      _.each(result, function (property, property_name) {
        if (definition.required && !definition.required.indexOf(property_name))
          delete result[property_name];
      });      
      display.json(result);
      return (true);
    }
  }
}
