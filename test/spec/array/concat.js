var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/concat and array/copy')
var t = painless.assert

var concat = require('../../../src/array/concat')
var dupe = require('../../../src/array/copy')

test('should concat arrays', function () {
  var arr1 = [1,2,3,4]
  var arr2 = [5,6,7,8]

  var res = concat(arr1, arr2)
  var expected = [1,2,3,4,5,6,7,8]

  t.same(res, expected)
})

test('should concat arrays', function () {
  var arr1 = [1,2,3,4]
  var arr2 = []

  var res = concat(arr1, arr2)
  var expected = [1,2,3,4]

  t.same(res, expected)
})

test('should copy arrays', function () {
  var arr1 = [1,2,3,4]
  var arr2 = [5,6,7,8]

  var res = dupe(arr1)
  var expected = [1,2,3,4]

  t.same(res, expected)
  t.not(res, expected)
})
