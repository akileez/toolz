var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/equals')
var t = painless.assert

var equals = require('../../../src/object/equals')

test('should return equal when objects have same properties and values', function(){
  t.is(equals({ test: true }, { test: true }), true)

  var a = { foo: 'foo-value', bar: 'bar-value' }
  var b = { foo: 'foo-value', bar: 'bar-value' }
  t.is(equals(a, b), true)
})

test('should consider empty objects equal', function() {
  t.is( equals({}, {}), true)
})

test('should use strict equals for non-objects', function() {
  t.is(equals('test', 'test'), true)
  t.is(equals('abc', ''), false)
  t.is(equals(null, null), true)
  t.is(equals(null, void 0), false)
  t.is(equals({}, null), false)
})

test('should require objects to have same properties', function() {
  var a = { test: true }
  var b = { test: true, special: true }
  t.is( equals(a, b), false)
  t.is( equals(b, a), false)
})

test('should require objects to have same values', function() {
  var a = { test: true, special: true }
  var b = { test: true, special: false }
  t.is( equals(a, b), false)
})

test('should allow objects with same prototype', function() {
  function A() {
    this.id = 'test'
  }
  A.prototype.test = true

  t.is(equals(new A(), new A()), true)
})

test('should not use prototype properties', function() {
  function Test() { }
  Test.prototype.test = true

  var a = new Test()
  var b = new Test()
  a.test = true
  t.is(equals(a, b), false)

  b.isB = true
  t.is(equals(a, b), false)
})

test('should only check own properties', function() {
  function A() { }
  A.prototype.isA = true
  function B() { }
  B.prototype.isA = false

  t.is(equals(new A(), new B()), true)
})

test('should ignore order of keys', function() {
  var a = { a: 1, b: 2 }
  var b = { b: 2, a: 1 }
  t.is(equals(a, b), true)
})

test('should allow custom compare function', function() {
  var a = { a: 1, b: 2 }
  var b = { a: '1', b: '02' }

  function numericCompare(a, b) {
    return +a === +b
  }

  t.is(equals(a, b, numericCompare), true)
})

test('should use custom compare function when values are not objects', function() {
  function numericCompare(a, b) {
    return +a === +b
  }

  t.is(equals('1.0', 1, numericCompare), true)
})
