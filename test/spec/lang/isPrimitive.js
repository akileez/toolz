var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/isPrimitive')
var t = painless.assert

var isPrimitive = require('../../../src/lang/isPrimitive')

test('should return true when primitive value', function() {
  t.is(isPrimitive(null), true)
  t.is(isPrimitive(undefined), true)
  t.is(isPrimitive(1), true)
  t.is(isPrimitive('foo'), true)
  t.is(isPrimitive(true), true)
  t.is(isPrimitive(false), true)
  t.is(isPrimitive(NaN), true)
  t.is(isPrimitive(Infinity), true)
})

test('should return false when not primitive value', function() {
  t.is(isPrimitive({}), false)
  t.is(isPrimitive([]), false)
  t.is(isPrimitive(/./), false)
  t.is(isPrimitive(function() {}), false)
  t.is(isPrimitive(new function() {}), false)
  t.is(isPrimitive(new Number), false)
  t.is(isPrimitive(new String), false)
  t.is(isPrimitive(new Boolean), false)
  t.is(isPrimitive(new Date), false)
  t.is(isPrimitive(new Error), false)
})