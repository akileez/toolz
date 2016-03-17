var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test array/flattener')
var t = painless.assert

var flatten = require('../../src/array/flattener')

test('should recursively flatten the array', function () {
  var arr = [1, [2], [3, [4], 5]]
  var ar1 = [1, [2], [3, [4, [5, 6]]]]
  var result = flatten(arr, true)
  var res1 = flatten(ar1, true)

  t.same(result, [1, 2, 3, 4, 5])
  t.same(res1, [1, 2, 3, 4, 5, 6])
})

test('should only flatten one layer if level is 1', function () {
  var arr = [1, [2], [3, [4, 5]]]
  var ar1 = [1, [2], [3, [4, [5, 6]]]]
  var result = flatten(arr, false)
  var res1 = flatten(ar1, false)

  t.same(result, [1, 2, 3, [4, 5]])
  t.same(res1, [1, 2, 3, [4, [5, 6]]])
})

test('should only flatten one layer if level is 1', function () {
  var arr = 23
  var ar1 = [true, false, true, [1]]
  var result = flatten(arr)
  var res1 = flatten(ar1, false, true)

  t.same(result, [])
  t.same(res1, [1])
})

test('should flatten arguemnts to array', function () {
  function foo () {
    return arguments
  }

  var res = flatten([foo('happy',2,3,4,5), 1])
  var exp = ['happy',2,3,4,5,1]

  t.same(res, exp)
})

test('should return empty array when source array is null/undefined', function () {
  t.same(flatten(null), [])
  t.same(flatten(undefined), [])
})
