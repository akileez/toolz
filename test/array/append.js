var test = require('../../src/assertion/ttr')
var append = require('../../src/array/append')

test.log('Testing array/append\n')

test('append all items of second array to end of first array', function (t) {
  var arr1 = [1, 2, 3]
  var arr2 = [3, 4, 5]
  var res

  res = append(arr1, arr2)
  t.is(arr1, res)
  t.same(arr1, [1,2,3,3,4,5])
})

test('append null array', function (t) {
  var arr1 = [1, 2]

  append(arr1, null)
  t.same(arr1, [1, 2])
})

test('append undefined array', function (t) {
  var arr1 = [1, 2, 3]

  append(arr1, undefined)
  t.same(arr1, [1, 2, 3])
})

test.result()
