var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/isReference')
var t = painless.assert

var isReference = require('../../../src/lang/isReference')

test('should return false when primitive value', function() {
  t.is(isReference(null), false)
  t.is(isReference(undefined), false)
  t.is(isReference(1), false)
  t.is(isReference('foo'), false)
  t.is(isReference(false), false)
  t.is(isReference(false), false)
  t.is(isReference(NaN), false)
  t.is(isReference(Infinity), false)
})

test('should return true when not primitive value', function() {
  t.is(isReference({}), true)
  t.is(isReference([]), true)
  t.is(isReference(/./), true)
  t.is(isReference(function() {}), true)
  t.is(isReference(new function() {}), true)
  t.is(isReference(new Number), true)
  t.is(isReference(new String), true)
  t.is(isReference(new Boolean), true)
  t.is(isReference(new Date), true)
  t.is(isReference(new Error), true)
})