var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/deepExtend')
var t = painless.assert

var deepExtend = require('../../../src/object/deepExtend')

test('should mix properties into target', function() {
  var target = {
      foo: true
  };

  deepExtend(target, { bar: true });

  t.same(target, {
      foo: true,
      bar: true
  });
});

test('should mix in multiple objects', function() {
  var target = {};

  deepExtend(target, { foo: true }, { bar: true });

  t.same(target, {
      foo: true,
      bar: true
  });
});

test('should return target object', function() {
  var target = {};

  var result = deepExtend(target, { foo: true });

  t.same(result, target);
});

test('should mix in child objects', function() {
  var target = {
      foo: { bar: "a" }
  };

  deepExtend(target, { foo: { bar: "b" } });

  t.same(target.foo.bar, "b");
});

test('should keep original child objects', function() {
  var foo = { foo: true };
  var target = { foo: foo };

  deepExtend(target, { foo: { bar: true } });

  t.same(target.foo, foo);
  t.same(target.foo.foo, true);
  t.same(target.foo.bar, true);
});

test('should keep added child objects', function() {
  var foo = { foo: true };
  var target = {};

  deepExtend(target, { foo: foo });

  t.same(target.foo, foo);
});

test('should overwrite existing values in target if value is not an object', function() {
  var target = {
      foo: { a: true },
      bar : [1,2,3]
  };

  // important to test against null
  deepExtend(target, { foo: null, bar: 1 });

  t.is(target.foo, null);
  t.is(target.bar,  1 );
});

test('should copy values that are not plain objects by reference', function() {
  function Custom() { }
  var source = {
      custom: new Custom(),
      items: [1, 2, 3],
      regexp: /test/
  };

  var target = {
      items: [5]
  };

  deepExtend(target, source);
  t.is(target.custom, source.custom);
  t.is(target.items, source.items);
  t.is(target.regexp, source.regexp);
});
