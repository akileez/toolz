var test = require('../../src/assertion/ttr')
var difference = require('../../src/array/difference')

test('difference should keep only items that are present on first array but not present on other arrays', (t) => {
  var a = ['a', 'b', 'c']
  var b = ['c', 1]
  var c = [1, 2, 3]

  var expected = ['a', 'b']

  t.same(difference(a, b, c), expected)
})

test('difference should remove duplicates', (t) => {
  var a = ['a', 'b', 1, 'b']
  var b = ['c', 'a', 1]
  var c = [1, 2, 3, 'a']

  var results = difference(a, b, c)
  var expected = ['b']

  t.same(results, expected)
})

test('difference should return an empty array if items are present on other arrays', (t) => {
  var a = ['b', 'a', 'c', 1, 2, 3]
  var b = ['c', 'a']
  var c = [1, 'b', 2, 3, 'a']

  var results = difference(a, b, c)
  var expected = []

  t.same(results, expected)
})

test('differnce should use empty array if null/undefined', (t) => {
  var arr = [1, 2]

  var res1 = difference(null, arr)
  var res2 = difference(undefined, arr)
  var res3 = difference(arr, null)
  var res4 = difference(arr, undefined)

  var expected1 = []
  var expected2 = arr

  t.same(res1, expected1)
  t.same(res2, expected1)
  t.same(res3, expected2)
  t.same(res4, expected2)
})

test.result()
