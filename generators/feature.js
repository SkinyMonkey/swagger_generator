function typeRegex(type, generated_property) {
  switch (type) {
    case 'string':
      // FIXME: [a-z\u00E0-\u00FC]
      return "[a-z0-9]+"; // FIXME : add accents etc
    case 'integer':
      return "[0-9]+";
    case 'boolean':
      return "^true|false$";
    // FIXME : check format on string for date type
    case 'date':
      return "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\+\\d{2}:\\d{2}$";
  }
  return (generated_property);
}

function generateFeatureProperty(generated_property, context) {
    var property_name = context.property_name;
    var type = context.properties[property_name].type;
    var suffix_id = '_id';

    if (property_name.indexOf(suffix_id, property_name.length - suffix_id.length) >= 0)
      return "^[a-z0-9]{24}$";
    else
      return typeRegex(type, generated_property);
   return (generated_property);
}

module.exports = {
  hooks: {
    start: function (result, context) {
      console.log(context.path, ':', context.verb.toUpperCase());
      return (result);
    },
    property: generateFeatureProperty,
    array: function(generated_array, context) {
      var index = 0;
      var res = [];
      var property_name = context.property_name;
      var type = '';

      while (index < 1) {
        if (context.properties[property_name].items)
          type = context.properties[property_name].items.type;
        else
          type = context.properties[property_name].type;
        
        // if its a simple type it will be populated directly with regex
        // else the generated object will be used
        res.push(typeRegex(type, generated_array[index]));
        index += 1;
      }
      return (res);
    }
  }
}
