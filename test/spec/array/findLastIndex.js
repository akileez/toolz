var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/findLastIndex and collection/findLastIndex')
var t = painless.assert

var findLastIndex = require('../../src/array/findLastIndex')
var filast = require('../../src/collection/findLastIndex')

test('should return index of first match starting from end of array', function () {
  var items = [1, {a: 1}, 1, 'foo', 'bar', {a: 1}]

  var findOne = function (val) {
    return val === 1
  }
  var isString = function (val) {
    return typeof val === 'string'
  }
  var findObj = function (val) {
    return val.a === 1
  }

  t.same(findLastIndex(items, findOne), 2)
  t.same(findLastIndex(items, isString), 4)
  t.same(findLastIndex(items, findObj), 5)
})

test('should return -1 when not found', function () {
  var items = [1, {a: 1}, 1, 'foo', 'bar', {a: 1}]
  var findTwo = function (val) {
    return val === 2
  }

  t.same(findLastIndex(items, findTwo), -1)
})

test('should return -1 when array is null/undefined', function () {
  var testFunc = function () {
    return true
  }

  t.is(findLastIndex(null, testFunc), -1)
  t.is(findLastIndex(undefined, testFunc), -1)
})

test('should support object shortcut syntax', function () {
  var items = [1, {a: 1}, 1, 'foo', 'bar', {a: 1}]
  t.same(filast(items, {a: 1}), 5)
})

test('should support string shortcut syntax', function () {
  var items = [1, {a: 1}, 1, 'foo', 'bar', {a: 1}]
  t.same(filast(items, 'a'), 5)
})

test('should pass array index and context', function () {
  var items = [1, 2, 3]
  var context = {}
  var testFunc = function (val, i, arr) {
    t.is(this, context)
    t.is(arr, items)
    t.is(val, arr[i])
    t.ok(i > -1, 'expect item to exist')
    t.ok(i < items.length)
    return false
  }
  t.is(filast(items, testFunc, context), -1)
})
