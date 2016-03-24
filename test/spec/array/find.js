var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/find and collection/find')
var t = painless.assert

var find = require('../../src/array/find')
var finder = require('../../src/collection/find')

test('should return first match', function () {
  var obj = { a: 'b' }
  var arr = [123, 'foo', 'bar', obj]

  t.same(find(arr, function (val) {
    return val === 123; }), 123)
  t.same(find(arr, function (val) {
    return typeof val === 'string'; }), 'foo')
  t.same(find(arr, function (val) {
    return val.a === 'b'; }), obj)

  t.same(finder(arr, function (val) {
    return val === 123; }), 123)
  t.same(finder(arr, function (val) {
    return typeof val === 'string'; }), 'foo')
  t.same(finder(arr, function (val) {
    return val.a === 'b'; }), obj)

})

test('should return undefined if array is null/undefined', function () {
  var testFunc = function () {
    return true
  }

  t.is(find(null, testFunc), undefined)
  t.is(find(undefined, testFunc), undefined)

  t.is(finder(null, testFunc), undefined)
  t.is(finder(undefined, testFunc), undefined)
})

test('should support object shortcut syntax', function () {
  var obj = { a: 'b' }
  var arr = [123, 'foo', 'bar', obj]

  t.same(finder(arr, { a: 'b' }), obj)
})

test('should support string shortcut syntax', function () {
  var obj = { a: 'b' }
  var arr = [123, 'foo', 'bar', obj]

  t.same(finder(arr, 'a'), obj)
})

