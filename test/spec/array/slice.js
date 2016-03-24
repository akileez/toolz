var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/slice')
var t = painless.assert

var slice = require('../../../src/array/slice')

test('should return slice of array', function () {
  var arr = [1, 2, 3, 4, 5]
  t.same(slice(arr, 1, 3), [2, 3])
})

test('should use end of array when end omitted', function () {
  var arr = [1, 2, 3, 4]
  t.same(slice(arr, 1), [2, 3, 4])
})

test('should include whole array when start and end are omitted', function () {
  var arr = [1, 2, 3, 4]
  var result = slice(arr)

  t.same(result, arr)
  t.isnt(result, arr)
})

test('should accept negative start and end', function () {
  var arr = [1, 2, 3, 4]
  t.same(slice(arr, 0, -2), [1, 2])
  t.same(slice(arr, -2, 4), [3, 4])
  t.same(slice(arr, -2, -1), [3])
})

test('should clamp negative start/end beyond array length', function () {
  var arr = [1, 2, 3]
  t.same(slice(arr, -5, 2), [1, 2])
  t.same(slice(arr, 0, -5), [])
})

test('should return empty array if start/end is higher than array length', function () {
  var arr = [1, 2, 3]
  t.same(slice(arr, 5), [])
  t.same(slice(arr, 5, 15), [])
})

test('should return empty array if start/end is higher than array length', function () {
  var arr = [1, 2, 3]
  t.same(slice(arr, 5), [])
  t.same(slice(arr, 15, 5), [])
})

test('should return whole array if end is higher than length', function () {
  var arr = [1, 2, 3]
  t.same(slice(arr, 0, 8), [1, 2, 3])
})

test('should return whole array if start and end are undefined', function () {
  var arr = [1, 2, 3]
  var strt
  var end
  t.same(slice(arr, strt, end), [1, 2, 3])
})

test('should return [] if start and end are null', function () {
  var arr = [1, 2, 3]
  var strt = null
  var end = null
  t.same(slice(arr, strt, end), [])
})

test('should NOT skip sparse array indexes', function () {
  var arr = [1]
  arr[4] = 4
  t.same(slice(arr, 3, 5), [undefined, 4])
})

test('should convert array-like object to array', function () {
  var obj = {length: 3, 0: 'a', 1: 'b', 2: 'c'}
  var result = slice(obj)

  t.same(result, ['a', 'b', 'c'])
  t.is(result.constructor, Array)
})

test('should convert arguments to array', function () {
  function foo () {
    return slice(arguments)
  }
  var result = foo('a', 'b', 'c')

  t.same(result, ['a', 'b', 'c'])
  t.is(result.constructor, Array)
})

