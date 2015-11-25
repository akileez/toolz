var test = require('../../src/assertion/ttr')
var combine = require('../../src/array/combine')

test('combine items of arr2 with arr1 ignoring dupes', function (t) {
  var arr1 = [1, 2, 3]
  var arr2 = [3, 4, 5]
  var res

  res = combine(arr1, arr2)
  t.is(arr1, res)
  t.same(arr1, [1, 2, 3, 4, 5])
})

test('combine null second array', function (t) {
  var arr1 = [1]
  combine(arr1, null)
  t.same(arr1, [1])
})

test('combine undefined second array', function (t) {
  var arr1 = [1, 2]
  var undef
  combine(arr1, undef)
  t.same(arr1, [1, 2])
})

test.result()