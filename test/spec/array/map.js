var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/map and collection/map')
var t = painless.assert

var map = require('../../src/array/map')
var mapc = require('../../src/collection/map')

test('should return a new array with modified items', function () {
  var base = [1, 2, 3, 4, 5]
  var r = map(base, function (val, i) {
    return val + i
  })
  t.isnt(r, base)
  t.same(r, [1, 3, 5, 7, 9])
})

test('should loop even if array is sparse. see #64', function () {
  function toOne (val, i) {
    return 1
  }
  var base = new Array(3)
  var r = map(base, toOne)
  // IMPORTANT
  // ---------
  // this behavior is different than native Array#map
  t.same(r, [1, 1, 1])
  base[5] = 'foo'
  r = map(base, toOne)
  t.same(r, [1, 1, 1, 1, 1, 1])
})

test('should return empty array if target is null/undefined', function () {
  var testFunc = function () {
    return {}
  }
  t.same(map(null, testFunc), [])
  t.same(map(undefined, testFunc), [])
})

test('should allow shorthand string syntax (same as "pluck")', function () {
  var arr = [{a: 1}, {b: 1}, {a: 3, c: 3}]
  t.same(mapc(arr, 'a'), [1, undefined, 3])
})

test('should return same values if no callback (identity)', function () {
  var arr = [1, 2, 3]
  t.same(mapc(arr), [1, 2, 3])
  t.isnt(mapc(arr), arr)
})
