var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/deepEquals')
var t = painless.assert

var deepEquals = require('../../../src/lang/deepEquals')

test('should check object values', function(){
  t.is(deepEquals({}, {}), true)
  t.is(deepEquals({ a: 1 }, { a: 1 }), true)
  t.is(deepEquals({ a: 1 }, { a: 2 }), false)
})

test('should recursively check values', function() {
  var a = { value: { a: 1 } }
  var b = { value: { a: 1 } }
  t.is(deepEquals(a, b), true)

  b.a = 2
  t.is(deepEquals(a, b), false)
})

test('should ensure objects have same properties', function() {
  var a = { value: { a: 1 } }
  var b = { value: { a: 1, b: 2 } }
  t.is(deepEquals(a, b), false)
  t.is(deepEquals(b, a), false)
})

test('should ignore order of keys', function() {
  var a = { value: { a: 1, b: 2 } }
  var b = { value: { b: 2, a: 1 } }
  t.is(deepEquals(a, b), true)
})

test('should check arrays', function() {
  var a = { value: { a: [1,3,[5, {c:6}]], b: 2 } }
  var b = { value: { b: 2, a: [1,3,[5, {c:6}]] } }
  t.is(deepEquals(a, b), true)
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
})

test('should only check object\'s own properties', function() {
  function A() { }
  A.prototype.isA = true
  function B() { }
  B.prototype.isA = false

  var a = { foo: new A() }
  var b = { foo: new B() }

  t.is(deepEquals(a, b), true)
})

test('should allow custom compare function', function() {
  var a = { a: 1, b: { value: 2 } }
  var b = { a: '1', b: { value: '02.0' } }

  function numericCompare(a, b) {
      return +a === +b
  }

  t.is(deepEquals(a, b, numericCompare), true)
})
