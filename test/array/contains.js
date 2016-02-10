var test = require('../../src/assertion/ttr')
var contains = require('../../src/array/contains')
var collection = require('../../src/collection/contains')

test.log('Testing array/contains and collection/contains\n')

test('contains should check for existance', (t) => {
  var arr = [1, 2, 3]
  t.is(contains(arr, 2), true)
  t.is(contains(arr, 4), false)

  t.is(collection(arr, 2), true)
  t.is(collection(arr, 4), false)
})

test('contains should return false when array is null/undefined', (t) => {
  t.is(contains(null, 1), false)
  t.is(contains(undefined, 1), false)

  t.is(collection.arr(null, 1), false)
  t.is(collection.arr(undefined, 1), false)
})

test.result()
