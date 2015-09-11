// on property generation
module.exports = {
  hooks: {
    property: function(generated_property, context) {
      var chance = Math.floor(Math.random() % 100);

      if (chance > 20)
        return ("");
      return (generated_property);
    },
    end: function(result, options) {
      for (property in result) {
        var chance = Math.floor(Math.random() % 100);

        if (chance > 30)
          delete result[property];
      }
      return (result);
    }
  }
}
