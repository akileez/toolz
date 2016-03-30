var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/max')

var t = painless.assert

var max = require('../../../src/object/max')
var collection = require('../../../src/collection/max')

test('should return maximum value', function () {
  t.is(max({a: 100, b: 2, c: 1, d: 3, e: 200}), 200)
  t.is(max({foo: 100, bar: 200}), 200)
  t.is(max({a: -10, b: 1, c: 0}), 1)
})

test('should return Infinity if empty', function () {
  t.is(max({}), Infinity)
})

test('should allow custom iterator', function () {
  t.is(max({a: 1, b: 2, c: 3}, function (val) {
    return -val
  }), 1)

  t.is(max({a: 'foo', b: 'lorem', c: 'amet'}, function (val) {
    return val.length
  }), 'lorem')
})

test('should allow string shorthand syntax', function () {
  var obj = {
    a: {foo: 'bar', lorem: 'ipsum', id: 1},
    b: {foo: 'bar', lorem: 'ipsum', id: 2},
    c: {foo: 'bar', lorem: 'ipsum', id: 0}
  }
  t.same(collection(obj, 'id'), obj.b)
  t.is(collection(obj, 'amet'), undefined)
})
