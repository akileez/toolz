var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/assign-value')
var t = painless.assert

var assign = require('../../../src/object/assign-value')

test('should extend a value:', function () {
  var obj = {}
  assign(obj, {a: 'b'})

  t.same(obj, {a: 'b'})
})

test('should assign a nested value:', function () {
  var obj = {}
  assign(obj, 'foo', {a: 'b'})

  t.same(obj.foo, {a: 'b'})
})

test('should work for key/value pairs:', function () {
  var obj = {}
  assign(obj, 'foo', 'b')

  t.is(obj.foo, 'b')
})

test('should extend an existing value:', function () {
  var obj = {foo: {a: 'b'}}
  assign(obj, 'foo', {c: 'd'})

  t.same(obj.foo, {a: 'b', c: 'd'})
})

test('should assign a deeply nested value:', function () {
  var obj = {}
  assign(obj, 'a.b.c', {one: 'two'})
  assign(obj, 'a.b.c', {three: 'four'})

  t.same(obj.a.b.c, {one: 'two', three: 'four'})
})

test('should throw an error when invalid args are passed:', function () {
  t.throws(() => {assign()})
})

test('should return object is if `prop` or `value` are undefined', function () {
  var obj = {}
  t.same(assign(obj), obj)
  t.same(assign(obj, 'a'), obj)
})
