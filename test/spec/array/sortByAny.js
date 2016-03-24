var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test array/sortByAny')
var t = painless.assert

var sortBy = require('../../src/array/sortByAny')

test('sortBy', function () {
  var fixture = [
    { a: 4, b: 1, c: 1 },
    { a: 4, b: 3, c: 1 },
    { a: 2, b: 2, c: 3 },
    { a: 2, b: 2, c: 2 },
    { a: 1, b: 3, c: 4 },
    { a: 1, b: 1, c: 4 },
    { a: 1, b: 2, c: 4 },
    { a: 3, b: 3, c: 3 },
    { a: 4, b: 3, c: 1 }
  ]
  var expected = [
    { a: 1, b: 1, c: 4 },
    { a: 1, b: 2, c: 4 },
    { a: 1, b: 3, c: 4 },
    { a: 2, b: 2, c: 2 },
    { a: 2, b: 2, c: 3 },
    { a: 3, b: 3, c: 3 },
    { a: 4, b: 1, c: 1 },
    { a: 4, b: 3, c: 1 },
    { a: 4, b: 3, c: 1 }
  ]
  t.same(sortBy(fixture, ['a', 'b', 'c']), expected)
})

test('sortBy, with undefined vals', function () {
  var fixture = [ { a: 1 }, { }, { }, { }, { a: 0 } ]
  var expected = [ { }, { }, { }, { a: 0 }, { a: 1 } ]
  t.same(sortBy(fixture, 'a'), expected)
})

test('sortBy, with undefined vals 2', function () {
  var fixture = [ { a: 'yeah' }, { }, { a: 'what' } ]
  var expected = [ { }, { a: 'what' }, { a: 'yeah' } ]
  t.same(sortBy(fixture, 'a'), expected)
})

test('custom order', function () {
  var fixture = [{ fruit: 'apple' }, { fruit: 'orange' }, { fruit: 'banana' }, { fruit: 'pear' }]
  var expected = [{ fruit: 'banana' }, { fruit: 'pear' }, { fruit: 'apple' }, { fruit: 'orange' }]
  var fruitOrder = [ 'banana', 'pear', 'apple', 'orange' ]
  t.same(sortBy(fixture, 'fruit', { fruit: fruitOrder }), expected)
})

test('sort by two columns, both custom', function () {
  var expected = [
    { importance: 'speed', weight: 'low' },
    { importance: 'speed', weight: 'medium' },
    { importance: 'speed', weight: 'high' },
    { importance: 'strength', weight: 'low' },
    { importance: 'strength', weight: 'medium' },
    { importance: 'strength', weight: 'high' },
    { importance: 'intelligence', weight: 'low' },
    { importance: 'intelligence', weight: 'medium' },
    { importance: 'intelligence', weight: 'high' }
  ]
  var fixture = [
    { importance: 'intelligence', weight: 'medium' },
    { importance: 'strength', weight: 'high' },
    { importance: 'speed', weight: 'low' },
    { importance: 'strength', weight: 'low' },
    { importance: 'speed', weight: 'high' },
    { importance: 'intelligence', weight: 'low' },
    { importance: 'speed', weight: 'medium' },
    { importance: 'intelligence', weight: 'high' },
    { importance: 'strength', weight: 'medium' }
  ]
  var customOrder = {
    importance: [ 'speed', 'strength', 'intelligence' ],
    weight: [ 'low', 'medium', 'high' ]
  }

  var result = sortBy(fixture, [ 'importance', 'weight' ], customOrder)
  t.same(result, expected)
})

test('sort by deep value', function () {
  var fixture = [
    { inner: { number: 5 } },
    { inner: { number: 2 } },
    { inner: { number: 3 } },
    { inner: { number: 1 } },
    { inner: { number: 4 } }
  ]
  var expected = [
    { inner: { number: 1 } },
    { inner: { number: 2 } },
    { inner: { number: 3 } },
    { inner: { number: 4 } },
    { inner: { number: 5 } }
  ]
  var result = sortBy(fixture, 'inner.number')
  t.same(result, expected)
})

test('sort by deep value, custom order', function () {
  var fixture = [
    { inner: { number: 5 } },
    { inner: { number: 2 } },
    { inner: { number: 3 } },
    { inner: { number: 1 } },
    { inner: { number: 4 } }
  ]
  var expected = [
    { inner: { number: 1 } },
    { inner: { number: 2 } },
    { inner: { number: 4 } },
    { inner: { number: 3 } },
    { inner: { number: 5 } }
  ]
  var customOrder = {
    'inner.number': [ 1, 2, 4, 3, 5 ]
  }
  var result = sortBy(fixture, 'inner.number', customOrder)
  t.same(result, expected)
})