var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test array/forEach')
var t = painless.assert

var forEach = require('../../src/array/forEach')

test('should loop and pass params to callback', function () {
  var result = 0
  var items = [1, 2, 3, 4, 5]
  forEach(items, function (val, i, arr) {
    t.is(arr, items)
    t.is(val, items[i])
    result += val
  })
  t.is(result, 15)
})

test('should normalize sparse arrays behavior', function () {
  // IMPORTANT!
  // ----------
  // this behavior is different than ES5 Array#forEach
  // there is no way to support sparse arrays properly on IE 7-8
  // so we dropped sparse array support altogether. see #64
  var arr1 = new Array(6)
  arr1[2] = 3
  arr1[5] = 8
  arr1[10] = undefined // it's a trap!
  var result = []
  forEach(arr1, function (val, i, arr) {
    t.is(arr, arr1)
    t.is(val, arr1[i])
    result.push(val)
  })
  t.same(result[0], undefined)
  t.same(result[1], undefined)
  t.same(result[2], 3)
  t.same(result[5], 8)
  t.same(result[10], undefined)
  t.same(result.length, 11)
})

test('should allow exiting the iteration early', function () {
  var arr = [1, 2, 3, 4, 5]
  var count = 0
  forEach(arr, function () {
    count++
    if (count === 2) {
      return false
    }
  })
  t.is(count, 2)
})

test('should not execute loop if array is null/undefined. match collection/forEach behavior', function () {
  var count = 0
  var testFunc = function () { count++ }
  forEach(null, testFunc)
  forEach(undefined, testFunc)
  t.is(count, 0)
})
