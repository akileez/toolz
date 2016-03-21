var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test lang/isNaN')
var t = painless.assert

var isNaN = require('../../src/lang/isNaN')

test('should return true for everything that isn\'t a number', function () {
  t.is(isNaN(true), true)
  t.is(isNaN(false), true)
  t.is(isNaN('000123'), true)
  t.is(isNaN('dolor123bar'), true)
  t.is(isNaN({}), true)
  t.is(isNaN([]), true)
  t.is(isNaN([1,2]), true)
  t.is(isNaN(''), true)
  t.is(isNaN(null), true)
  t.is(isNaN(undefined), true)
  t.is(isNaN(NaN), true)
  t.is(isNaN(new Number(NaN)), true)
})

test('should return false if value is a REAL number', function () {
  t.is(isNaN(123), false)
  t.is(isNaN(new Number(123)), true)
  t.is(isNaN(new Number('123')), true)
})