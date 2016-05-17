var painless = require('../../assertion/painless')
var test = painless.createGroup('Test math/clamp')
var t = painless.assert

var clamp = require('../../../src/math/clamp')

test('should return max if val bigger than max', function () {
  t.is(clamp(10, 1, 10), 10)
  t.is(clamp(11, 1, 10), 10)
  t.is(clamp(12, 1, 10), 10)
  t.is(clamp(9999, 1, 10), 10)
  t.is(clamp(Number.MAX_VALUE, 1, 10), 10)

  t.is(clamp(-2, -10, -2), -2)
  t.is(clamp(-1, -10, -2), -2)
  t.is(clamp(0, -10, -2), -2)
  t.is(clamp(10, -10, -2), -2)
})

test('should return min if val smaller than min', function () {
  t.is(clamp(1, 1, 10), 1)
  t.is(clamp(-11, 1, 10), 1)
  t.is(clamp(0, 1, 10), 1)
  t.is(clamp(-9999, 1, 10), 1)
  t.is(clamp(-Number.MAX_VALUE, 1, 10), 1)

  t.is(clamp(-Number.MAX_VALUE, -10, -2), -10)
  t.is(clamp(-12, -10, -2), -10)
  t.is(clamp(-11, -10, -2), -10)
  t.is(clamp(-10, -10, -2), -10)
})

test('should return val if inside range', function () {
  t.is(clamp(6, 1, 10), 6)
  t.is(clamp(55, 1, 100), 55)
  t.is(clamp(0, -50, 50), 0)
  t.is(clamp(-6, -10, -2), -6)

  t.is(clamp(10, -Number.MAX_VALUE, Number.MAX_VALUE), 10)
  t.is(clamp(1234567890, -Number.MAX_VALUE, Number.MAX_VALUE), 1234567890)
})
