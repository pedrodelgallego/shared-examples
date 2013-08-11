Shared examples and contexts
============================

Shared examples let you describe behaviour of objects and functions. When
declared, a shared group's content is stored. It is only executed in
the context of another example group, which provides any context the
shared group needs to run.

A shared group is included in another group using any of:

The initial code for this project was taken from a very interesting
post by ThoughtBot

http://robots.thoughtbot.com/post/9611103221/jasmine-and-shared-examples

```javascript
SharedExamples.define("a user", function(){
    it("should have an email account", function(){
        expect(_.isBlank(user.email)).to.be(false);
    });
});

describe("admin", function(){
    itShouldBehaveLike("a user");
});
```

*WARNING*: Shared examples must be defined before using them
use them.
```javascript
var collection;

SharedExamples.define("a collection", function(){
  it("says it has three items", function(){
      expect(collection.length).to.be(3);
  });
});

describe("Array", function(){
    beforeEach(function(){
        collection = [1, 2, 3];
    });

    itShouldBehaveLike("a collection");
});

describe("Set", function(){
    beforeEach(function(){
        collection = new Set(1,2,3);
    });

    itShouldBehaveLike("a collection");
});
```

Defining examples
-----------------

```javascript
SharedExamples.define( {
  rectangle: function() {
    it("has four sides", function() {
      expect(this.subject.sides).toEqual(4);
    });
  },

  square: function() {
    it("has the same width and height", function() {
      expect(this.subject.width).toEqual(this.subject.height);
    });
  },

  "an object with area": function(options) {
    it("calculates area correctly", function() {
      expect(this.subject.area()).toEqual(options.area);
    });
  }
});

describe("shapes", function() {
  describe("rectangle", function() {
    beforeEach(function() {
      this.subject = new Rectangle({ width: 5, height: 10 });
    });

    itShouldBehaveLike("rectangle");
    itShouldBehaveLike("an object with area", { area : 50 });
    itShouldBehaveLike("square", function() {
      beforeEach(function() {
        this.subject.set({ width: this.subject.height });
      });
    });
  });

  describe("square", function() {
    beforeEach(function() {
      this.subject = new Rectangle({ width: 5, height: 5 });
    });

    itShouldBehaveLike("rectangle");
    itShouldBehaveLike("an object with area", { area : 25 });
    itShouldBehaveLike("square");
  });
});
```
