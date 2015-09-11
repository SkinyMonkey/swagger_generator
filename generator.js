var _ = require('lodash');

var generator = null;
var hooks = null;

function setGenerator() {
  var generator_path = process.argv[3];

  if (!generator_path) {
    console.log('node swagger_to_json.js SWAGGER_SPEC_PATH CONF_PATH');
    process.exit(-1);
  }

  generator = require(generator_path);
  generator.hook = callHook;
  hooks = generator.hooks;
  return (generator);
};

function callHook(hook_name, result, context) {
  if (hooks[hook_name]){
    result = hooks[hook_name](result, context);

    if (result == undefined || result == null)
      throw "Result of the \"" + hook_name + "\" hook was undefined, did you forget to return a result?";
  }
  return (result);
}

module.exports = setGenerator();
