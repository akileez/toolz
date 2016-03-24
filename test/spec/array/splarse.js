var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/splarse')
var t = painless.assert

var splarse = require('../../src/array/splarse')

test('removes an element from the array', function () {
  var arr = [1, 2, 3, 4]
  splarse(arr, [2])
  t.same(arr, [1, 2, 4])
})

test('removes sparse elements from the array', function () {
  var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  splarse(arr, [9, 6, 7, 3])
  t.same(arr, [1, 2, 3, 5, 6, 9])
})

test('removes sparse elements from the array', function () {
  var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  splarse(arr, 9, 6, 7, 3)
  t.same(arr, [1, 2, 3, 5, 6, 9])
})