var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/min')

var t = painless.assert

var min = require('../../../src/object/min')
var collection = require('../../../src/collection/min')

test('should return minimum value', function () {
  t.is(min({a: 100, b: 2, c: 1, d: 3, e: 200}), 1)
  t.is(min({foo: 100, bar: 200}), 100)
  t.is(min({a: -10, b: 1, c: 0}), -10)
})

test('should return -Infinity if empty', function () {
  t.is(min({}), -Infinity)
})

test('should allow custom iterator', function () {
  t.is(min({a: 1, b: 2, c: 3}, function (val) {
    return -val
  }), 3)

  t.is(min({a: 'foo', b: 'lorem', c: 'amet'}, function (val) {
    return val.length
  }), 'foo')
})

test('should allow string shorthand syntax', function () {
  var obj = {
    a: {foo: 'bar', lorem: 'ipsum', id: 1},
    b: {foo: 'bar', lorem: 'ipsum', id: 2},
    c: {foo: 'bar', lorem: 'ipsum', id: 0}
  }
  t.same(collection(obj, 'id'), obj.c)
  t.is(collection(obj, 'amet'), undefined)
})
