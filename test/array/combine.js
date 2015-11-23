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

test.result()