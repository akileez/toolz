var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/split')
var t = painless.assert
var split = require('../../src/array/split')

test('should split array into segments', function () {
  var arr = [1, 2, 3, 4, 5, 6]
  t.same(split(arr, 3), [
    [1, 2],
    [3, 4],
    [5, 6]
  ])
})

test('should default to 2 segments', function () {
  var arr = [1, 2, 3, 4, 5, 6]
  t.same(split(arr), [
    [1, 2, 3],
    [4, 5, 6]
  ])
})

test('should put remaining items on first segments if not even split', function () {
  var arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  t.same(split(arr, 3),
    [
      ['a', 'b', 'c'],
      ['d', 'e', 'f'],
      ['g', 'h']
    ])
})

test('should return empty array when input is empty', function () {
  t.same(split([]), [])
})

test('should return empty array when input is null/undefined', function () {
  t.same(split(null), [])
  t.same(split(undefined), [])
})

test('should not return empty segments', function () {
  var arr = [1, 2]
  t.same(split(arr, 3), [
    [1],
    [2]
  ])
})
