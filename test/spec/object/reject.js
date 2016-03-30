var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/reject')

var t = painless.assert

var reject = require('../../../src/object/reject')
var collection = require('../../../src/collection/reject')
var size = require('../../../src/object/size')

test('should reject items', function () {
  var obj = {a: 1, b: 2, c: 3, d: 4, e: 5}
  var thisObj = {}

  var result = collection(obj, function (val, key, list) {
    t.same(val, obj[key])
    t.same(list, obj)
    t.same(this, thisObj)
    return (val % 2) !== 0
  }, thisObj)

  t.is(size(obj), 5)
  t.same(result, {b: 2, d: 4})
})

test('should return empty object if all items rejected', function () {
  var obj = {a: 1, b: 2, c: 3, d: 4, e: 5}
  var result = reject(obj, function () {
    return true
  })

  t.same(result, {})
})

test('should support shorthand syntax', function () {
  var obj = {
    a: {foo: 'bar', lorem: 'ipsum', id: 1},
    b: {foo: 'bar', lorem: 'ipsum', id: 2},
    c: {foo: 'bar', lorem: 'ipsum', id: 4}
  }
  t.same(collection(obj, {foo: 'bar', lorem: 'ipsum'}), {})
  t.same(collection(obj, {lorem: 'ipsum', id: 1}), {b: obj.b, c: obj.c})
  t.same(collection(obj, {amet: 123}), obj)
})

test('should allow string shorthand syntax', function () {
  var obj = {
    a: {foo: 'bar', lorem: 'ipsum', id: 1},
    b: {foo: 'bar', lorem: 'ipsum', id: 2},
    c: {foo: 'bar', lorem: 'ipsum', id: 0}
  }
  t.same(collection(obj, 'foo'), {})
  t.same(collection(obj, 'id'), {c: obj.c})
  t.same(collection(obj, 'amet'), obj)
})
