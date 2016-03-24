var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/findLast and collection/findLast')
var t = painless.assert

var findLast = require('../../src/array/findLast')
var filast = require('../../src/collection/findLast')

test('should return last match', function () {
  var obj = {a: 'b'}
  var arr = [123, 'foo', 'bar', obj]

  t.same(findLast(arr, function (val) {
    return val === 123
  }), 123)
  t.same(findLast(arr, function (val) {
    return typeof val === 'string'
  }), 'bar')
  t.same(findLast(arr, function (val) {
    return val.a === 'b'
  }), obj)
})

test('should return undefined if array is null/undefined', function () {
  var testFunc = function () {
    return true
  }

  t.is(findLast(null, testFunc), undefined)
  t.is(findLast(undefined, testFunc), undefined)
})

test('should support object shortcut syntax', function () {
  var obj = {a: 'b'}
  var arr = [123, 'foo', 'bar', obj]

  t.same(filast(arr, {a: 'b'}), obj)
})

test('should support string shortcut syntax', function () {
  var obj = {a: 'b'}
  var arr = [123, 'foo', 'bar', obj]

  t.same(filast(arr, 'a'), obj)
})
