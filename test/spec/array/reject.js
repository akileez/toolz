var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/reject')
var t = painless.assert
var reject = require('../../../src/array/reject')
var collection = require('../../../src/collection/reject')

test('should reject items', function () {
  var items = [1, 2, 3, 4, 5],
    thisObj = {}
  var result = collection(items, function (val, i, arr) {
    t.is(val, items[i])
    t.is(arr, items)
    t.is(this, thisObj)
    return (val % 2) !== 0
  }, thisObj)
  t.eq(items.length, 5)
  t.same(result, [2, 4])
})

test('should iterate over sparse arrays. see #64', function () {
  var items = new Array(6)
  items[2] = 13
  items[5] = 6
  var count = 0
  var result = reject(items, function (val, i, arr) {
    count += 1
    return val == null || (val % 2 === 0)
  })
  t.same(result, [13])
  t.eq(count, 6)
})

test('should return empty array if all items rejected', function () {
  var items = [1, 2, 3, 4, 5]
  var result = reject(items, function () {
    return true })
  t.same(result, [])
})

test('should return empty array if source array is null/undefined', function () {
  var testFunc = function () {
    return true }
  t.same(reject(null, testFunc), [])
  t.same(reject(undefined, testFunc), [])
})

test('should allow object shorthand syntax', function () {
  var arr = [{a: 1, b: 2}, {a: 2, b: 3}, {a: 1}, {a: 1, b: 2, c: 3}]
  t.same(collection(arr, {a: 1}), [arr[1]])
})

test('should allow string shorthand syntax', function () {
  var arr = [{a: 1, b: 2}, {a: 2, b: 3}, {a: 1}, {a: 1, b: 2, c: 3}]
  t.same(collection(arr, 'c'), arr.slice(0, 3))
})
