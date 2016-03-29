var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/map')

var t = painless.assert

var map = require('../../../src/object/map')
var collection = require('../../../src/collection/map')

test('should return a new object with updated values', function () {
  var obj = {
    a: 1,
    b: 2
  }

  var result = map(obj, function (x) {
    return x + 1 })
  t.is(result.a, 2)
  t.is(result.b, 3)
  t.diff(result, obj)
})

test('should pass key as second parameter', function () {
  var obj = {
    a: null,
    b: null
  }

  var result = map(obj, function (val, key) {
    return key })
  t.is(result.a, 'a')
  t.is(result.b, 'b')
  t.diff(result, obj)
})

test('should pass object as third parameter', function () {
  var obj = {
    a: null,
    b: null
  }

  var result = map(obj, function (v, k, obj) {
    return obj })
  t.same(result.a, obj)
  t.same(result.b, obj)
})

test('should keep undefined/null properties', function () {
  var obj = {
    u: undefined,
    n: null
  }

  var result = map(obj, function (v) {
    return v })
  t.is('u' in obj, true)
  t.is(obj.u, undefined)
  t.is(obj.n, null)
})

test('should use provided this object', function () {
  var obj = {foo: null},
    thisObj = {}

  var result = collection(obj, function () {
    return this }, thisObj)
  t.same(result.foo, thisObj)
})

test('should allow string shorthand syntax', function () {
  var obj = {
    a: {foo: 'bar', lorem: 'ipsum', id: 1},
    b: {foo: 'bar', lorem: 'ipsum', id: 2},
    c: {foo: 'bar', lorem: 'ipsum', id: 0}
  }
  t.same(collection(obj, 'foo'), {a: 'bar', b: 'bar', c: 'bar'})
  t.same(collection(obj, 'id'), {a: 1, b: 2, c: 0})
  t.same(collection(obj, 'amet'), {a: undefined, b: undefined, c: undefined})
})

test('should return a new object with unchanged values if no callback', function () {
  var obj = {
    a: 1,
    b: 2
  }
  var result = collection(obj)
  t.same(result, {a: 1, b: 2})
  t.same(result, obj)
})
