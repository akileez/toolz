var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/contains and collection/contains')
var t = painless.assert
var contains = require('../../../src/array/contains')
var collection = require('../../../src/collection/contains')

test('should check for existance', () => {
  var arr = [1, 2, 3]
  t.is(contains(arr, 2), true)
  t.is(contains(arr, 4), false)

  t.is(collection(arr, 2), true)
  t.is(collection(arr, 4), false)
})

test('should return false when array is null/undefined', () => {
  t.is(contains(null, 1), false)
  t.is(contains(undefined, 1), false)

  t.is(collection.arr(null, 1), false)
  t.is(collection.arr(undefined, 1), false)
})

test('should return true if the value exists in the array.', () => {
  var arr = ['a', 'b', 'c', 'c']
  var actual = contains(arr, 'a')
  t.is(actual, true)
  t.is(collection(arr, 'a'), true)
})

test('should return true if the value exists in the array.', () => {
  var arr = ['a', 'b', 'c', 'c']
  var actual = contains(arr, 'd')
  t.is(actual, false)
  t.is(collection(arr, 'd'), false)
})

test('should\'nt blow up on empty arrays', () => {
  var arr = []
  var actual = contains(arr, 'd')
  t.is(actual, false)
  t.is(collection(arr, 'd'), false)
})

test('should\'nt blow up on null', () => {
  var actual = contains(null, 'd')
  t.is(actual, false)
  t.isnt(actual, true)
  t.is(collection.arr(null, 'd'), false)
  t.isnt(collection.arr(null, 'd'), true)
})

test('should\'nt blow up when no value is passed', () => {
  var actual = contains(null)
  t.is(actual, false)
  t.isnt(actual, true)
  t.is(collection.arr(null), false)
  t.isnt(collection.arr(null), true)
})

