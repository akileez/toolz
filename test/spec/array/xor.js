var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/xor')
var t = painless.assert

var xor = require('../../../src/array/xor')

test('should keep only items that are present in a single array', function () {
  var a = ['a', 'b', 1]
  var b = ['c', 1]
  t.same(xor(a, b), ['a', 'b', 'c'])
})

test('should remove duplicates', function () {
  var a = ['a', 'b', 1, 'b']
  var b = ['c', 'a', 1, 'c']
  t.same(xor(a, b), ['b', 'c'])
})

test('should return an empty array if items are present on both arrays', function () {
  var a = ['a', 'c']
  var b = ['c', 'a']
  t.same(xor(a, b), [])
})

test('should use empty array if array is null/undefined', function () {
  t.same(xor(null, [1]), [1])
  t.same(xor(undefined, [1]), [1])
})
