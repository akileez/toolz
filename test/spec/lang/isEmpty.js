var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/isEmpty')
var t = painless.assert

var isEmpty = require('../../../src/lang/isEmpty')

test('handles arrays', function () {
  t.is(isEmpty([]), true)
  t.is(isEmpty(['a', 'b']), false)
});

test('handles objects', function () {
  t.is(isEmpty({}), true)
  t.is(isEmpty({ a: 'b' }), false)
});

test('handles strings', function () {
  t.is(isEmpty(''), true)
  t.is(isEmpty('string'), false)
});

test('handles numbers', function () {
  t.is(isEmpty(0), true)
  t.is(isEmpty(42), false)
});

test('handles functions', function () {
  t.is(isEmpty(function(){}), true)
  t.is(isEmpty(function(a,b){}), false)
});

test('handles nulls', function () {
  t.is(isEmpty(null), true)
  t.is(isEmpty(undefined), true)
  t.is(isEmpty(), true)
});

test('handles booleans', function () {
  t.is(isEmpty(false), false)
  t.is(isEmpty(true), false)
});