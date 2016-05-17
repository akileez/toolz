var painless = require('../../assertion/painless')
var test = painless.createGroup('Test math/ceil')
var t = painless.assert

var ceil = require('../../../src/math/ceil')

test('should round value up', function () {
  t.is(ceil(10.2),  11)
  t.is(ceil(10.7),  11)
})

test('should allow a custom radix', function () {
  t.is(ceil(10.7, 2),  12)
  t.is(ceil(10.7, 5),  15)
  t.is(ceil(12, 5),  15)
  t.is(ceil(12, 1000),  1000)
  t.is(ceil(1000.1, 1000),  2000)
})

test('should work with negative numbers', function () {
  t.is(ceil(-5.3), -5)
  t.is(ceil(-5.3, -2), -4)
})

test('should not round up if value is divisible by radix', function () {
  t.is(ceil(1), 1)
  t.is(ceil(2, 2), 2)
  t.is(ceil(15, 5), 15)
})

test('should work properly with fractional step', function () {
  t.is(ceil(1.2, 0.25), 1.25)
  t.is(ceil(1.42, 0.25), 1.5)
  t.is(ceil(1.5, 0.25), 1.5)
})
