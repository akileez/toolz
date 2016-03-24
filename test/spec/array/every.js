var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/every and collection/every')
var t = painless.assert
var every = require('../../src/array/every')
var everc = require('../../src/collection/every')
var isEven = require('../../src/number/isEven')

test('should work on normal array', () => {
  var a1 = [1, 2, 3]
  var a2 = [1, 3, 5]
  var a3 = [2, 4, 6]

  t.is(every(a1, isEven), false)
  t.is(every(a2, isEven), false)
  t.is(every(a3, isEven), true)

  t.is(everc(a1, isEven), false)
  t.is(everc(a2, isEven), false)
  t.is(everc(a3, isEven), true)
})

test('should iterate over sparse items', () => {
  var a1 = [1, 2, 3]
  a1[10] = 8
  var a2 = [1, 3, 5]
  a2[10] = 7
  var a3 = [2, 4, 6]
  a3[10] = 10

  // IMPORTANT
  // ---------
  // this behavior is different than ES5 Array#every
  t.is(every(a1, isEven), false )
  t.is(every(a2, isEven), false )
  t.is(every(a3, isEven), false )
  t.is(every(a3, function(val){
      return val == null || (val % 2 === 0)
  }), true)

  t.is(everc(a1, isEven), false )
  t.is(everc(a2, isEven), false )
  t.is(everc(a3, isEven), false )
  t.is(everc(a3, function(val){
      return val == null || (val % 2 === 0)
  }), true)
})

test('should work on empty arrays', () => {
  //it is vacuously true that all elements of the empty set satisfy any given condition.
  t.is(every([], isEven), true)
  t.is(everc([], isEven), true)
})

test('should work on null/undefined array', () => {
  t.is(every(null, isEven), true)
  t.is(every(undefined, isEven), true)

  // here we call collection-every.arr explicitly because the make() function
  // does not handle null or undefined for the multitude of situations it must
  // deal with correctly. this is no fault of the every() function.
  t.is(everc.arr(null, isEven), true)
  t.is(everc.arr(undefined, isEven), true)
})

test('should loop forwards to avoid undesired behavior', () => {
  // not that the loop order should matter on a truth check over all elements
  var a1 = [1, 3, 7]
  var res1 = []
  var res2 = []

  t.is(every(a1, (val, i, arr) => {
    res1.push(val)
    return val !== 8
  }), true)

  t.same(res1, [1, 3, 7])

  t.is(everc(a1, (val, i, arr) => {
    res2.push(val)
    return val !== 8
  }), true)

  t.same(res2, [1, 3, 7])
})

test('collection-every.arr should allow shorthand object syntax', function () {
  var arr = [{a:3}, {a:3,b:2}, {a:3,b:4}, {a:3,b:1}]

  t.is(everc(arr, {a:3}), true)
  t.is(everc(arr, {b:2}), false)
})

test('collection-every.arr should allow shorthand string syntax', function () {
  var arr = [{a:3}, {a:3,b:2}, {a:3,b:4}, {a:3,b:1}]

  t.is(everc(arr, 'a'), true)
  t.is(everc(arr, 'b'), false)
})
