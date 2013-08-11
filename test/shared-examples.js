(function(){
  "use strict";
  var expect  = require('chai').expect,
      sut = require('../lib/shared-examples.js'),
      sinon = require("sinon");

  describe("API", function(){
    it("should have a define function", function(){
      expect(typeof sut.define).to.equal("function");
    });

    it("should have a itShouldBehaveLike function", function(){
      expect(typeof sut.itShouldBehaveLike).to.equal("function");
    });
  });

  describe("defining an example", function(){
    it("using a function should create a new example", function(){
      var fn = sinon.spy(function(){});
      sut.define("a collection", fn);
      expect(sut.examples["a collection"]).to.equal(fn);
    });

    it("using an object should create as many new examples as the object has properties", function(){
      var fn = sinon.spy(function(){}),
          fn2 = sinon.spy(function(){});
      sut.define({square: fn, rectangle: fn2});

      expect(sut.examples.square).to.equal(fn);
      expect(sut.examples.rectangle).to.equal(fn2);
    });
  });

  describe("executing examples", function(){
    // Not test yet
  });

})();
