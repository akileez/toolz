var painless = require('../../assertion/painless')
var test = painless.createGroup('Test math/inRange')
var t = painless.assert

var inRange = require('../../../src/math/inRange')

test('should return true if val is inside range', function () {
  t.is(inRange(6, 1, 10), true)
  t.is(inRange(55, 1, 100), true)
  t.is(inRange(0, -50, 50), true)
  t.is(inRange(-6, -10, -2), true)

  t.is(inRange(10, -Number.MAX_VALUE, Number.MAX_VALUE), true)
  t.is(inRange(1234567890, -Number.MAX_VALUE, Number.MAX_VALUE), true)
})

test('should return false if val is outside range', function () {
  t.is(inRange(-6, 1, 10), false)
  t.is(inRange(555, 1, 100), false)
  t.is(inRange(51, -50, 50), false)
  t.is(inRange(-11, -10, -2), false)
})

test('should tolerate threshold', function () {
  t.is(inRange(12, 1, 10, 2), true)
  t.is(inRange(500, 1, 100, 400), true)
  t.is(inRange(12, 1, 10, 1), false)
  t.is(inRange(500, 1, 100, 300), false)

  t.is(inRange(10.5, 1, 10, 0.5), true)
  t.is(inRange(10.5, 1, 10, 0.25), false)
})
