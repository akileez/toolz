var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test array/flatten')
var t = painless.assert

var flatten = require('../../src/array/flatten')

test('should recursively flatten the array', function () {
  var arr = [1, [2], [3, [4], 5]]
  var result = flatten(arr)

  t.same(result, [1, 2, 3, 4, 5])
})

test('should only flatten one layer if level is 1', function () {
  var arr = [1, [2], [3, [4, 5]]]
  var result = flatten(arr, 1)

  t.same(result, [1, 2, 3, [4, 5]])
})

test('should only flatten 2 layers if level is 2', function () {
  var arr = [1, [2], [3, [4, [5, 6]]]]
  var result = flatten(arr, 2)

  t.same(result, [1, 2, 3, 4, [5, 6]])
})

test('should return empty array when source array is null/undefined', function () {
  t.same(flatten(null), [])
  t.same(flatten(undefined), [])
})
