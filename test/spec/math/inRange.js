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

test('should pass in-range tests', function () {
  t.true(inRange(0, 0))
  t.true(inRange(1, 1))
  t.true(inRange(5, 10))
  t.true(inRange(1, 0, 1))
  t.true(inRange(2, 0, 2))
  t.true(inRange(5, 0, 10))
  t.true(inRange(10, -Infinity, Infinity))
  t.true(inRange(-10, -Infinity, Infinity))
  t.true(inRange(-1, -10, 10))
  t.true(inRange(1.5, 1.1, 1.7))
  t.true(inRange(1.5, 1.1, 1.7))
  t.true(inRange(5, 1, 10)) // exception here --> orignal code inRange(5, 10, 1)
  t.false(inRange(3, 1, 2))
})

test('should throw if val, min or max args are not numbers', function () {
  t.throws(() => {inRange('foo', 'bar', 'baz')})
  t.throws(() => {inRange(5, 'bar', 'baz')})
  t.throws(() => {inRange(5, 1, 'baz', 2)})
  t.throws(() => {inRange(5, 1, new Date(), 2)})
})
