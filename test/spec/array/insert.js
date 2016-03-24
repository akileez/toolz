var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/insert')
var t = painless.assert
var insert = require('../../src/array/insert')

test('should push item if not present and return the length', function () {
  var arr = [1, 2, 3]
  t.is(insert(arr, 3), 3)
  t.is(arr.length, 3)
  t.same(arr, [1, 2, 3])
  t.is(insert(arr, 4), 4)
  t.is(arr.length, 4)
  t.same(arr, [1, 2, 3, 4])
})

test('should accept multiple items', function () {
  var arr = ['a', 'b']
  t.is(insert(arr, 'a', 'b'), 2)
  t.is(arr.length, 2)
  t.same(arr, ['a', 'b'])
  t.is(insert(arr, 1, 2, 'b', 3, 'a', 'c'), 6)
  t.is(arr.length, 6)
  t.same(arr, ['a', 'b', 1, 2, 3, 'c'])
})

test('should accept multiple items as an array', function () {
  var arr = ['a', 'b']
  t.is(insert(arr, ['a', 'b']), 2)
  t.is(arr.length, 2)
})
