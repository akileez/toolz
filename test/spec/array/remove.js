var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/remove')
var t = painless.assert
var remove = require('../../src/array/remove')

test('should work in normal array', function () {
  var arr = [1, 'a', 2, 'b']
  remove(arr, 'a')
  t.is(arr[1], 2)
  t.same(arr.length, 3)
})

test('should work in sparse array', function () {
  var arr = []
  arr[1] = 1
  arr[3] = 'a'
  arr[6] = 2
  arr[8] = 'b'
  remove(arr, 'a')
  t.eq(arr[3], undefined)
  t.same(arr.length, 8)
})

test('should not modify the array if the item does not exist', function () {
  var arr = [1, 'a', 2, 'b']
  remove(arr, 'c')
  t.same(arr, [1, 'a', 2, 'b'])
})
