var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test array/max')
var t = painless.assert

var max = require('../../src/array/max')
var maxc = require('../../src/collection/max')

test('should return maximum value', function () {
  t.is(max([100, 2, 1, 3, 200]), 200)
  t.is(max([100, 200]), 200)
  t.is(max([-10, 1, 0]), 1)
})

test('should return Infinity if empty', function () {
  t.is(max([]), Infinity)
})

test('should return Infinity if array is null/undefined', function () {
  t.is(max(null), Infinity)
  t.is(max(undefined), Infinity)
})

test('should allow custom iterator', function () {
  t.is(max([1, 2, 3], function (val) {
    return -val
  }), 1)

  t.is(max(['foo', 'lorem', 'amet'], function (val) {
    return val.length
  }), 'lorem')
})

test('should allow shorthand string iterator', function () {
  var arr = [{a: 1, b: 3}, {a: 4, b: 5}, {a: 2, b: 8}]
  t.is(maxc(arr, 'a'), arr[1])
  t.is(maxc(arr, 'b'), arr[2])
})

test('should pass thisObj to callback', function () {
  var arr = [{a: 1, b: 3}, {b: 2}, {c: 1.5}]
  var context = ['a', 'b', 'c']

  function map (val, i) {
    return val[this[i]]
  }

  t.is(maxc(arr, map, context), arr[1])
})
