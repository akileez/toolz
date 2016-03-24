var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test array/reduce and collection/reduce')
var t = painless.assert

var reduce = require('../../src/array/reduce')
var reduce2 = require('../../src/array/reduce2')


test('should reduce array into a single value', function () {
  var arr = [1, 2, 3, 4]
  var compare1 = []
  var compare2 = []

  function sum (prev, cur, idx, arr) {
    compare1.push(prev)
    return prev + cur
  }

  function mult (prev, cur, idx, arr) {
    compare2.push(prev)
    return prev * cur
  }
  t.is(reduce(arr, sum), 10)
  t.is(reduce(arr, mult), 24)
  t.same(compare1, [1, 3, 6])
  t.same(compare2, [1, 2, 6])
})

test('[reduce2] should reduce array into a single value', function () {
  var arr = [1, 2, 3, 4]
  var compare1 = []
  var compare2 = []

  function sum (prev, cur, idx, arr) {
    compare1.push(prev)
    return prev + cur
  }

  function mult (prev, cur, idx, arr) {
    compare2.push(prev)
    return prev * cur
  }
  t.is(reduce2(arr, sum), 10)
  t.is(reduce2(arr, mult), 24)
  t.same(compare1, [1, 3, 6])
  t.same(compare2, [1, 2, 6])
})

test('should allow init value', function () {
  var arr = [1, 2, 3, 4]

  function sum (prev, cur, idx, arr) {
    return prev + cur
  }

  function mult (prev, cur, idx, arr) {
    return prev * cur
  }
  t.is(reduce(arr, sum, 10), 20)
  t.is(reduce(arr, mult, 10), 240)
})

test('[reduce2] should allow init value', function () {
  var arr = [1, 2, 3, 4]

  function sum (prev, cur, idx, arr) {
    return prev + cur
  }

  function mult (prev, cur, idx, arr) {
    return prev * cur
  }
  t.is(reduce2(arr, 10, sum), 20)
  t.is(reduce2(arr, 10, mult), 240)
})

test('should pass proper params to callback', function () {
  var base = [1, 2, 3, 4]

  function foo (prev, cur, idx, arr) {
    t.is(arr[idx - 1], prev)
    t.is(arr, base)
    return cur
  }
  t.is(reduce(base, foo), 4)
})

test('should throw error if empty', function () {
  function sum (prev, cur, idx, arr) {
    return prev + cur
  }
  t.throws(function () { reduce([], sum) })
})

test('should throw error if null/undefined', function () {
  var testFunc = function () {}
  t.throws(function () { reduce(null, testFunc) })
  t.throws(function () { reduce(undefined, testFunc) })
})

test('should work on empty arrays if provide initVal', function () {
  function sum (prev, cur, idx, arr) {
    return prev + cur
  }
  t.is(reduce([], sum, 10), 10)
})

test('should work on null/undefined array if initVal provided', function () {
  var testFunc = function () {}
  t.is(reduce(null, testFunc, 10), 10)
  t.is(reduce(undefined, testFunc, 10), 10)
})

test('should loop over sparse items. see #64', function () {
  function specialSum (prev, cur, i, arr) {
    var a = prev == null ? 1 : prev
    var b = cur == null ? 1 : cur
    return a + b
  }
  var base = [1, 5]
  base[7] = 4
  base[10] = undefined
  // IMPORTANT
  // ---------
  // this behavior is different than ES5 Array#reduce since
  // it doesn't skip sparse items
  t.same(reduce(base, specialSum), 18)
  t.same(reduce(base, specialSum, 2), 20)
})

test('should allow "undefined" as initial value', function () {
  // thx @jdalton for catching this one see #gh-57
  var base = [1, 2, 3]
  var compare = []
  var r = reduce(base, function (prev, cur, i, arr) {
    compare.push(prev)
    return prev == null ? cur : prev * cur
  }, undefined)
  t.is(r, 6)
  t.same(compare, [undefined, 1, 2])
})
