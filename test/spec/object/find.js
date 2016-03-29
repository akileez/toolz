var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/find and collection/find')
var t = painless.assert

var find = require('../../../src/object/find')
var collection = require('../../../src/collection/find')

test('should return a property that returns true on the truthy test, loop order isn\'t ensured', function () {
  var inner = {
    first: 1,
    second: 2
  };
  var obj = {
    a: 123,
    b: 'foo',
    c: inner
  };
  t.is(find(obj, function (val) {
    return val === 123; }), 123);
  t.is(find(obj, function (val) {
    return typeof val === 'string'; }), 'foo');
  t.same(find(obj, function (val) {
    return val.first === 1; }), inner);
});

test('should avoid don\'t enum bug on IE 7-8', function () {
  var obj = {
    a: 123,
    toString: 'foo123',
    z: 'bar'
  };
  t.is(find(obj, function (val) {
    return val === 'foo123';
  }), 'foo123');
});

test('should support shorthand syntax', function () {
  var obj = {
    a: { foo: 'bar', lorem: 'ipsum', id: 1 },
    b: { foo: 'bar', lorem: 'ipsum', id: 2 },
    c: { foo: 'bar', lorem: 'ipsum', id: 4 }
  };
  t.same(collection(obj, { lorem: 'ipsum', id: 1 }), obj.a);
  t.is(collection(obj, { amet: 123 }), undefined);
});

test('should allow string shorthand syntax', function () {
  var obj = {
    a: { foo: 1, bar: null },
    b: { foo: 0, bar: '' },
    c: { foo: 0, bar: 'amet' }
  };
  t.same(collection(obj, 'foo'), obj.a);
  t.same(collection(obj, 'bar'), obj.c);
  t.is(collection(obj, 'amet'), undefined);
});
