var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/merge-with')
var t = painless.assert

var mergeWith = require('../../../src/object/merge-with')

var map = {a: 1}
var map2 = {a: 2, b: 5}
var map3 = {b: 3}
var map4 = {c: 0, a: 1}

function add(a, b) {
  return a + b
}

test('should throw an error if no maps array is provided', function() {
  t.throws(() => {mergeWith()})
})

test('should throw an error if no function is provided', function() {
  t.throws(() => {mergeWith([])})
})

test('should return an empty object if no maps are provided', function() {
  var m = mergeWith([], add)
  t.eq(Object.keys(m).length, 0)
})

test('should return a copy of a single given map', function() {
  var m = mergeWith([map], add)
  t.ne(m, map)
  t.eq(m.a, map.a)
})

test('should merge 2 objects with a fn call', function() {
  var m = mergeWith([map, map2], add)
  t.eq(m.a, 3)
})

test('should merge n objects with a fn call', function() {
  var m = mergeWith([map, map2, map3, map4], add)
  t.eq(m.a, 4)
  t.eq(m.b, 8)
  t.eq(m.c, 0)
})
