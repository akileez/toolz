var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test array/concat')
var t = painless.assert

var concat = require('../../src/array/concat')

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
