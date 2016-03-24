var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/min')
var t = painless.assert

var min = require('../../../src/array/min')
var minc = require('../../../src/collection/min')

test('should return maximum value', function () {
  t.is(min([100, 2, 1, 3, 200]), 1)
  t.is(min([100, 200]), 100)
  t.is(min([-10, 1, 0]), -10)
})

test('should return Infinity if empty', function () {
  t.is(min([]), -Infinity)
})

test('should return Infinity if array is null/undefined', function () {
  t.is(min(null), -Infinity)
  t.is(min(undefined), -Infinity)
})

test('should allow custom iterator', function () {
  t.is(min([1, 2, 3], function (val) {
    return -val
  }), 3)

  t.is(min(['foo', 'lorem', 'amet'], function (val) {
    return val.length
  }), 'foo')
})

test('should allow shorthand string iterator', function () {
  var arr = [{a: 1, b: 3}, {a: 4, b: 1}, {a: 2, b: 8}]
  t.is(minc(arr, 'a'), arr[0])
  t.is(minc(arr, 'b'), arr[1])
})

test('should pass thisObj to callback', function () {
  var arr = [{a: 1, b: 0}, {b: 0.5}, {c: 1.5}]
  var context = ['a', 'b', 'c']

  function map (val, i) {
    return val[this[i]]
  }

  t.is(minc(arr, map, context), arr[1])
})
