var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/reduce')
var test2 = painless.createGroup('Test object/reduce2')

var t = painless.assert

var reduce = require('../../../src/object/reduce')
var reduce2 = require('../../../src/object/reduce2')

test('should reduce object into a single value', function () {
  var obj = {a: 1, b: 2, c: 3, d: 4}
  var compare1 = []
  var compare2 = []

  function sum (prev, cur, key, list) {
    compare1.push(prev)
    return prev + cur
  }

  function mult (prev, cur, key, list) {
    compare2.push(prev)
    return prev * cur
  }

  t.is(reduce(obj, sum), 10)
  t.is(reduce(obj, mult), 24)

  t.same(compare1, [1, 3, 6])
  t.same(compare2, [1, 2, 6])
})

test('should allow init value', function () {
  var obj = {a: 1, b: 2, c: 3, d: 4}

  function sum (prev, cur, key, list) {
    return prev + cur
  }

  function mult (prev, cur, key, list) {
    return prev * cur
  }

  t.is(reduce(obj, sum, 10), 20)
  t.is(reduce(obj, mult, 10), 240)
})

test('should throw error if empty', function () {
  function sum (prev, cur, key, list) {
    return prev + cur
  }
  t.throws(function () { reduce({}, sum) })
})

test('should work on empty objects if providing initial value', function () {
  function sum (prev, cur, key, list) {
    return prev + cur
  }
  t.is(reduce({}, sum, 10), 10)
})

test('should allow "undefined" as initial value', function () {
  // thx @jdalton for catching this one see #gh-57
  var obj = {a: 1, b: 2, c: 3}
  var compare = []

  var r = reduce(obj, function (prev, cur, key, list) {
    compare.push(prev)
    return prev == null ? cur : prev * cur
  }, undefined)

  t.is(r, 6)
  t.same(compare, [undefined, 1, 2])
})

// test2('should reduce object into a single value', function () {
//   var obj = {a: 1, b: 2, c: 3, d: 4}
//   var compare1 = []
//   var compare2 = []

//   function sum (prev, cur, key, list) {
//     compare1.push(prev)
//     return prev + cur
//   }

//   function mult (prev, cur, key, list) {
//     compare2.push(prev)
//     return prev * cur
//   }

//   t.is(reduce2(obj, 0, sum), 10)
//   t.is(reduce2(obj, undefined, mult), 24)

//   t.same(compare1, [1, 3, 6])
//   t.same(compare2, [1, 2, 6])
// })

test2('should allow init value', function () {
  var obj = {a: 1, b: 2, c: 3, d: 4}

  function sum (prev, cur, key, list) {
    return prev + cur
  }

  function mult (prev, cur, key, list) {
    return prev * cur
  }

  t.is(reduce2(obj, 10, sum), 20)
  t.is(reduce2(obj, 10, mult), 240)
})

test2('should work on empty objects if providing initial value', function () {
  function sum (prev, cur, key, list) {
    return prev + cur
  }
  t.is(reduce2({}, 10, sum), 10)
})

test2('should allow "undefined" as initial value', function () {
  // thx @jdalton for catching this one see #gh-57
  var obj = {a: 1, b: 2, c: 3}
  var compare = []

  var r = reduce2(obj, undefined, function (prev, cur, key, list) {
    compare.push(prev)
    return prev == null ? cur : prev * cur
  })

  t.is(r, 6)
  t.same(compare, [undefined, 1, 2])
})
