var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/deepEquals and lang/isEqual')
var t = painless.assert

var deepEquals = require('../../../src/lang/deepEquals')
var isEqual = require('../../../src/lang/isEqual')

test('should check object values', function(){
  t.is(deepEquals({}, {}), true)
  t.is(deepEquals({ a: 1 }, { a: 1 }), true)
  t.is(deepEquals({ a: 1 }, { a: 2 }), false)

  t.is(isEqual({}, {}), true)
  t.is(isEqual({ a: 1 }, { a: 1 }), true)
  t.is(isEqual({ a: 1 }, { a: 2 }), false)
})

test('should recursively check values', function() {
  var a = { value: { a: 1 } }
  var b = { value: { a: 1 } }
  t.is(deepEquals(a, b), true)
  t.is(isEqual(a, b), true)

  b.a = 2
  t.is(deepEquals(a, b), false)
  t.is(isEqual(a, b), false)
})

test('should ensure objects have same properties', function() {
  var a = { value: { a: 1 } }
  var b = { value: { a: 1, b: 2 } }
  t.is(deepEquals(a, b), false)
  t.is(deepEquals(b, a), false)

  t.is(isEqual(a, b), false)
  t.is(isEqual(b, a), false)
})

test('should ignore order of keys', function() {
  var a = { value: { a: 1, b: 2 } }
  var b = { value: { b: 2, a: 1 } }
  t.is(deepEquals(a, b), true)
  t.is(isEqual(a, b), true)
})

test('should check arrays', function() {
  var a = { value: { a: [1,3,[5, {c:6}]], b: 2 } }
  var b = { value: { b: 2, a: [1,3,[5, {c:6}]] } }
  t.is(deepEquals(a, b), true)
  t.is(isEqual(a, b), true)
})

test('should use strict equals for non-objects', function() {
  t.is(deepEquals({}, null), false)
  t.is(deepEquals(null, {}), false)
  t.is(deepEquals(null, null), true)
  t.is(deepEquals(null, undefined), false)
  t.is(deepEquals(NaN, NaN), true)
  t.is(deepEquals(+0, -0), false)
  t.is(deepEquals(0, 0), true)
  t.is(deepEquals('123', 123), false)

  t.is(isEqual({}, null), false)
  t.is(isEqual(null, {}), false)
  t.is(isEqual(null, null), true)
  t.is(isEqual(null, undefined), false)
  t.is(isEqual(NaN, NaN), true)
  t.is(isEqual(+0, -0), true) // Note lodash version is different
  t.is(isEqual(0, 0), true)
  t.is(isEqual('123', 123), false)
})

test('should only check object\'s own properties', function() {
  function A() { }
  A.prototype.isA = true
  function B() { }
  B.prototype.isA = false

  var a = { foo: new A() } // { foo: A {} }
  var b = { foo: new B() } // { foo: B {} }

  t.is(deepEquals(a, b), false)
  t.is(isEqual(a, b), false)
})

test('should allow custom compare function', function() {
  var a = { a: 1, b: { value: 2 } }
  var b = { a: '1', b: { value: '02.0' } }

  function numericCompare(a, b) {
      return +a === +b
  }

  t.is(deepEquals(a, b, numericCompare), true)
  // this is lodash._isEqualWith
  // t.is(isEqual(a, b, numericCompare), true)
})
