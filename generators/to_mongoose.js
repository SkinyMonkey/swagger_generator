_ = require('lodash');
util = require('util');

var id = 0;

module.exports = {
  from: 'definitions',
  array: {
    size: 1
  },
  hooks: {
    start: function (result, context) {
      if (!context.original_definition_name)
        context.original_definition_name = context.definition_name;

      context.schema_name = context.definition_name.charAt(0).toLowerCase() + context.definition_name.slice(1);
      console.log("var " + context.schema_name + "Schema = mongoose.Schema({");
      return (result);
    },
    property: function(generated_property, context) {
      var property_name = context.property_name;
      var property = _.clone(context.properties[property_name]);

      /*
      if array && !property.items['$ref']
        return [property.items.type]
        */

      if (property.type == 'array' && property.items['$ref']) {
        var full_path = property.items['$ref'];
        var definition_name = _.last(full_path.split('/'));
        //return [{type: 'Schema.Types.ObjectId', ref: definition_name}];
        return (generated_property);
      }

      if (property.format)
        delete property.format;

      if (property.description)
        delete property.description;

      return (property);
    },
    array: function (array, context) {
      return (array);
    },
    end: function (result, context) {
      result = util.inspect(result, false, 10)
      result = result.replace(/'string'/g, 'String');
      result = result.replace(/'integer'/g, 'Number');
      result = result.replace(/'boolean'/g, 'Boolean');
      result = result.replace(/'Schema.Types.ObjectId'/g, 'Schema.Types.ObjectId');
      console.log(result);
      console.log("});");
      console.log("var " + context.definition_name + " = mongoose.model('" + context.definition_name + "', "+ context.schema_name +"Schema);");
      console.log();
      return (result);
    }
  }
}
