var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/isNaN')
var t = painless.assert

var isNaN = require('../../../src/number/isNaN')

test('should return true only for the NaN value', function () {
  t.is(isNaN(NaN), true)
  t.is(isNaN(0 / 0), true)
})

test('should return false to everything else', function () {
  t.is(isNaN(true), false)
  t.is(isNaN(false), false)
  t.is(isNaN('000123'), false)
  t.is(isNaN('dolor123bar'), false)
  t.is(isNaN({}), false)
  t.is(isNaN([]), false)
  t.is(isNaN([1, 2]), false)
  t.is(isNaN(''), false)
  t.is(isNaN(null), false)
  t.is(isNaN(undefined), false)
  t.is(isNaN(123), false)
  t.is(isNaN(new Number(123)), false)
  t.is(isNaN(new Number('123')), false)
  // yes. this is weird but follows spec
  t.is(isNaN(new Number(NaN)), false)
})
