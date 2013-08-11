/*!
 * Shared Examples
 *
 * SharedExamples is a DSL for creating shared executable examples.
 *
 * Shared examples let you describe behaviour of object and modules.
 * When declared, a shared examples's content is stored. It is only
 * executed in the context of another example group, which provides
 * any context the shared group needs to run.
 *
 * Copyright: Pedro Del Gallego
 * Licenced under the BSD License.
 */
(function(factory) {
	if(typeof define === 'function' && define.amd) {
    //AMD
		define(factory);

	} else if(typeof module === 'object' && module.exports) {
    //NODE
		module.exports = factory();

	} else {
    //GLOBAL
		window.SharedExamples = factory();
    window.itShouldBehaveLike = window.SharedExamples.itShouldBehaveLike;
	}
})(function(){
  var api,
      examples = {};

  function isObejct(obj){
    return typeof obj === "object";
  }

  function isString(obj){
    return typeof obj === "string";
  }

  api = {
    define: function(name, shared){
      var k;
      if (isString(name)){
        examples[name] = shared;
      } else if (isObejct(name)) {
        shared = name;
        for (k in shared) {
          if (shared.hasOwnProperty(k)) {
            examples[k] = shared[k];
          }
        }
      }
    },

    itShouldBehaveLike: function() {
      var exampleName  = _.first(arguments),
      exampleArguments = _.select(_.rest(arguments), function(arg) { return !_.isFunction(arg); }),
      innerBlock       = _.detect(arguments, function(arg) { return _.isFunction(arg); }),
      exampleGroup     = appNamespace.jasmine.sharedExamples[exampleName];

      if(exampleGroup) {
        return describe(exampleName, function() {
          exampleGroup.apply(this, exampleArguments);
          if(innerBlock) { innerBlock(); }
        });
      } else {
        return it("cannot find shared behavior: '" + exampleName + "'", function() {
          expect(false).toEqual(true);
        });
      }
    },

    examples: examples
  };

  return api;
});
