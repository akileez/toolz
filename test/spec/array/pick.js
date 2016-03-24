var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/pick')
var t = painless.assert
var pick = require('../../../src/array/pick')

var arr = [1,2,3,4,5,6,7,8,9]

// pick.first(arr)     // [ 1 ]
// pick.first(arr, 3)  // [ 1, 2, 3 ]
// pick.last(arr)      // [ 8 ]
// pick.last(arr, 3)   // [ 6, 7, 8 ]
// pick.before(arr, 4) // [ 1, 2, 3, 4 ]
// pick.after(arr, 3)  // [ 4, 5, 6, 7, 8 ]
// pick.between(arr, 1, 3) // [ 2, 3 ]
// pick.rand(arr)      // [ 4 ]
// pick.rand(arr, 3)   // [ 8, 3, 6 ]

test('pick.first item in array', () => {
  t.same(pick.first(arr), [1])
})

test('pick.before item in array', () => {
  t.same(pick.before(arr, 4), [1,2,3,4,5])
})

test('pick.before item in array', () => {
  t.same(pick.before(arr), [1,2,3,4,5,6,7,8])
})

test('pick.after item in array', () => {
  t.same(pick.after(arr, 3), [4,5,6,7,8,9])
})

test('pick.after item in array', () => {
  t.same(pick.after(arr), [2,3,4,5,6,7,8,9])
})

test('pick.between item in array', () => {
  t.same(pick.between(arr, 2, 4), [3,4])
})

test('pick.between item in array', () => {
  t.same(pick.between(arr), [1,2,3,4,5,6,7,8])
})

test('pick.between item in array', () => {
  t.same(pick.between(arr, 4), [5,6,7,8])
})

test('pick.rand item in array', () => {
  t.is(pick.rand(arr, 4).length, 4)
})

test('pick.rand item in array', () => {
  t.eq(pick.rand(arr).length, 1)
})

test('pick.rand item in array', () => {
  t.eq(pick.rand(arr, 10).length, 9)
})

test('pick.rand item in array', () => {
  var arr = []
  t.eq(pick.rand(arr), undefined)
  t.same(pick.rand(arr, 1), [])
})