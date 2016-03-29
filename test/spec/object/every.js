var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/every')
var t = painless.assert

var every = require('../../../src/object/every')
var collection = require('../../../src/collection/every')
var isEven = require('../../../src/number/isEven')

test('should work on normal object', function () {
  var a1 = {a: 1, b: 2, c: 3}
  var a2 = {a: 1, b: 3, c: 5}
  var a3 = {a: 2, b: 4, c: 6}

  t.is(every(a1, isEven), false)
  t.is(every(a2, isEven), false)
  t.is(every(a3, isEven), true)
})

test('should work on empty objects', function () {
  t.is(every({}, isEven), true)
})

test('should avoid don\'t enum bug on IE 7-8', function () {
  var a1 = {a:2, toString:3}
  var a2 = {a:2, toString:4}
  t.is(every(a1, isEven), false)
  t.is(every(a2, isEven), true)
})

test('should support shorthand syntax', function () {
  var obj = {
    a : {foo:'bar', lorem:'ipsum', id:1},
    b : {foo:'bar', lorem:'ipsum', id:2},
    c : {foo:'bar', lorem:'ipsum', id:4}
  }
  t.is(collection(obj, {foo:'bar', lorem:'ipsum'}), true)
  t.is(collection(obj, {lorem:'ipsum', id:1}), false)
  t.is(collection(obj, {amet:123}), false)
})

test('should allow string shorthand syntax', function () {
  var obj = {
    a : {foo:'bar', lorem:'ipsum', id:1},
    b : {foo:'bar', lorem:'ipsum', id:2},
    c : {foo:'bar', lorem:'ipsum', id:0}
  }
  t.is(collection(obj, 'foo'), true)
  t.is(collection(obj, 'id'), false)
  t.is(collection(obj, 'amet'), false)
})
