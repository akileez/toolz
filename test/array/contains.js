var test = require('../../src/assertion/ttr')
var contains = require('../../src/array/contains')

test('contains should check for existance', (t) => {
  var arr = [1, 2, 3]
  t.is(contains(arr, 2), true)
  t.is(contains(arr, 4), false)
})

test('contains should return false when array is null/undefined', (t) => {
  t.is(contains(null, 1), false)
  t.is(contains(undefined, 1), false)
})

test.result()
