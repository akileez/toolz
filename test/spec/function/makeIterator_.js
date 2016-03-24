var painless = require('../../assertion/painless')
var test = painless.createGroup('Test function/makeIterator_')
var t = painless.assert
var makeIterator_ = require('../../../src/function/makeIterator_')

test('should return source argument if it is already a function with no context', function () {
  var fn = function () {};
  t.is(makeIterator_(fn), fn);
});

test('should return a function that calls object/deepMatches if argument is an object', function () {
  var fn = makeIterator_({ a: 1, b: { c: 2 } });
  t.is(fn({ a: 1, b: { c: 2, d: 3 } }), true);
  t.is(fn({ a: 1, b: { c: 3 } }), false);
});

test('should return a function that returns the property value if argument is a string', function () {
  var fn = makeIterator_('a');
  t.is(fn({ a: 1, b: 2 }), 1);
  t.is(fn({ a: 2, b: 2 }), 2);
});

test('should return a function that returns the property value if argument is a number', function () {
  var fn = makeIterator_(1);
  t.is(fn([0, 4, 5]), 4);
  t.is(fn([6, 7, 8]), 7);
});

test('should return an identify function if no args', function () {
  var fn = makeIterator_();
  t.is(fn(null), null);
  t.is(fn(void(0)), void(0));
  t.is(fn(3), 3);
});

test('should return an identify function if first arg is `null`', function () {
  var fn = makeIterator_(null);
  t.is(fn(null), null);
  t.is(fn(void(0)), void(0));
  t.is(fn(3), 3);
});

test('should return a function that is called with the specified context', function () {
  var context = {};
  var iterator = makeIterator_(function () {
    return this; }, context);
  t.is(iterator(), context);
});
