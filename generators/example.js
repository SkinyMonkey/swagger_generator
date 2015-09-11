module.exports = {
  hooks: {
    start: function (generated_property, context) {
      ;
    },
    property: function(generated_property, context) {
      var property_name = context.property_name;
      // XXX: Do whatever you want here
      return (generated_property);
    },
    array: function(generated_array, context) {
      var cb = context.cb;
      var index = 0;
      var res = [];

      // XXX: Do whatever you want here
      while (index < 2) {
        res.push(cb());
        index += 1;
      }
      return (res);
    },
    end: function (result, context) {
      return (true);
    }
  }
}
