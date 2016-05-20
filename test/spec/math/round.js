var painless = require('../../assertion/painless')
var test = painless.createGroup('Test math/round')
var t = painless.assert

var round = require('../../../src/math/round')

test('should round value', function () {
  t.is(round(2.3), 2)
  t.is(round(2.6), 3)
})

test('should work with negative numbers', function () {
  t.is(round(-2.3), -2)
  t.is(round(-2.6), -3)
})

test('should round 0.5 up', function () {
  t.is(round(0), 0)
  t.is(round(0.2), 0)
  t.is(round(0.49), 0)
  t.is(round(0.5), 1)
  t.is(round(0.51), 1)
  t.is(round(-0.49), 0)
  t.is(round(-0.5), 0)
  t.is(round(-0.51), -1)
})

test('should allow custom radix', function () {
  t.is(round(1, 3), 0)
  t.is(round(1.49, 3), 0)
  t.is(round(1.5, 3), 3)
  t.is(round(1.51, 3), 3)
  t.is(round(2, 3), 3)
  t.is(round(4, 3), 3)
  t.is(round(5, 3), 6)
})

test('should allow fractional radix', function () {
  t.is(round(0, 0.5), 0)
  t.is(round(0.22, 0.5), 0)
  t.is(round(0.49, 0.5), 0.5)
  t.is(round(0.5, 0.5), 0.5)
  t.is(round(0.6, 0.5), 0.5)
  t.is(round(0.74, 0.5), 0.5)
  t.is(round(0.75, 0.5), 1)
  t.is(round(0.76, 0.5), 1)
  t.is(round(1.2, 0.5), 1)
  t.is(round(1.3, 0.5), 1.5)
})

test('should allow negative value and radix', function () {
  t.is(round(-0.5, -0.5), -0.5)
  t.is(round(-0.6, -0.5), -0.5)
  t.is(round(-0.74, -0.5), -0.5)
  t.is(round(-0.75, -0.5), -1)
  t.is(round(-0.76, -0.5), -1)
  t.is(round(-1.2, -0.5), -1)
  t.is(round(-1.3, -0.5), -1.5)
})
