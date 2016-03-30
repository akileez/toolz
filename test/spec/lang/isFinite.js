var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/isFinite')
var t = painless.assert

var isFinite = require('../../../src/lang/isFinite')

test('should return false for all values that aren\'t finite', function () {
  t.is(isFinite(null), false)
  t.is(isFinite(), false)
  t.is(isFinite(void(0)), false)
  t.is(isFinite(true), false)
  t.is(isFinite(false), false)
  t.is(isFinite(new String('')), false)
  t.is(isFinite(new String('asd')), false)
  t.is(isFinite(''), false)
  t.is(isFinite('asd'), false)
  t.is(isFinite([]), false)
  t.is(isFinite([1, 2, 3]), false)
  t.is(isFinite({}), false)
  t.is(isFinite({ a: 1, b: 'bar' }), false)
  t.is(isFinite(NaN), false)
  t.is(isFinite(-Infinity), false)
  t.is(isFinite(+Infinity), false)
  t.is(isFinite('Infinity'), false)
})

test('should return true to all finite values', function () {
  t.is(isFinite('-123'), true)
  t.is(isFinite('123'), true)
  t.is(isFinite(new Number(123)), false)
  t.is(isFinite(Number(123)), true)
  t.is(isFinite(123), true)
  t.is(isFinite(123.45), true)
  t.is(isFinite(-123), true)
  t.is(isFinite(-123.45), true)
  t.is(isFinite(0), true)
})
