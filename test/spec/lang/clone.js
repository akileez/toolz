var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/clone')
var t = painless.assert
var clone = require('../../src/lang/clone')

test('should not return source object', function() {
  var src = {};
  var result = clone(src);
  t.ne(result, src);
});

test('should copy source properties', function() {
  var src = { test: true };
  var result = clone(src);
  t.eq(result.test, true);
});

test('should copy deep properties', function() {
  var src = { test: { me: true} };
  var result = clone(src);
  t.eq(result.test.me, true);
  t.ne(result, src)
});

test('should not clone child objects', function() {
  var src = { test: {} };
  var result = clone(src);
  t.eq(result.test, src.test);
});

test('should clone arrays', function() {
  var src = [1, 2, 3];
  var result = clone(src);
  t.ne(result, src);
  t.same(result, src);
});

test('should clone functions', function() {
  var src = function foo () {return 'foo'};
  var result = clone(src);
  t.eq(result, src);
  t.same(result, src);
});

test('should clone RegExps', function() {
  var src = /test/gim;
  var result = clone(src);
  t.ne(result, src);
  t.same(result, src);
  t.is(result.ignoreCase, true);
  t.is(result.multiline, true);
  t.is(result.global, true);
});

test('should clone Dates', function() {
  var src = new Date();
  var result = clone(src);
  t.ne(result, src);
  t.same(result, src);
});

test('should not clone objects created with custom constructor', function() {
  function TestType() { }
  var src = new TestType();
  var result = clone(src);
  t.is(result, src);
});
