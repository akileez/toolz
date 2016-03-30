var painless   = require('../../assertion/painless')
var test       = painless.createGroup('Test object/some')

var t          = painless.assert

var some       = require('../../../src/object/some')
var collection = require('../../../src/collection/some')
var isEven     = require('../../../src/number/isEven')

test('should work on normal object', function () {
  var a1 = {a: 1, b: 2, c: 3}
  var a2 = {a: 1, b: 3, c: 5}
  var a3 = {a: 2, b: 4, c: 6}

  t.is(some(a1, isEven), true)
  t.is(some(a2, isEven), false)
  t.is(some(a3, isEven), true)
})

test('should work on empty objects', function () {
  t.is(some({}, isEven), false)
})

test('should avoid don\'t enum bug on IE 7-8', function () {
  var a1 = {a: 1, toString: 2}
  var a2 = {a: 1, toString: 3}
  t.is(some(a1, isEven), true)
  t.is(some(a2, isEven), false)
})

test('should support shorthand syntax', function () {
  var obj = {
    a: {foo: 'bar', lorem: 'ipsum', id: 1},
    b: {foo: 'bar', lorem: 'ipsum', id: 2},
    c: {foo: 'bar', lorem: 'ipsum', id: 4}
  }
  t.is(collection(obj, {foo: 'bar', lorem: 'ipsum'}), true)
  t.is(collection(obj, {lorem: 'ipsum', id: 1}), true)
  t.is(collection(obj, {id: 123}), false)
  t.is(collection(obj, {amet: 123}), false)
})

test('should allow string shorthand syntax', function () {
  var obj = {
    a: {foo: 'bar', lorem: 'ipsum', id: 1, disabled: false},
    b: {foo: 'bar', lorem: 'ipsum', id: 2, disabled: false},
    c: {foo: 'bar', lorem: 'ipsum', id: 0, disabled: false}
  }
  t.is(collection(obj, 'foo'), true)
  t.is(collection(obj, 'id'), true)
  t.is(collection(obj, 'amet'), false)
  t.is(collection(obj, 'disabled'), false)
})
