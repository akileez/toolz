var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test array/removeAll')
var t = painless.assert
var removeAll = require('../../src/array/removeAll')

test('should work in normal array', function () {
  var arr = [1, 'a', 2, 'b', 'a', 'a']
  removeAll(arr, 'a')
  t.eq(arr[1], 2)
  t.is(arr.length, 3)
})

test('should work in sparse array', function () {
  var arr = []
  arr[1] = 1
  arr[3] = 'a'
  arr[6] = 2
  arr[8] = 'b'
  arr[9] = 'a'
  arr[15] = 'a'
  removeAll(arr, 'a')
  t.eq(arr[3], undefined)
  t.is(arr.length, 13)
})
