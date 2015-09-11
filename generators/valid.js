module.exports = {
  from: 'paths',
  array: {
    size: 1
  },
  hooks : {
    property: function(generated_property, context) {
      switch (context.property_name) {
        case 'timezone':  {
          return "+02:00";
        }
      }
      return (generated_property);
    }
  }
}
