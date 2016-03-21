var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test lang/isPlainObject')
var t = painless.assert

var isPlainObject = require('../../src/lang/isPlainObject')

test('should return true when plain object', function () {
  t.is(isPlainObject({}), true)
  t.is(isPlainObject({test: true}), true)
  t.is(isPlainObject(new Object()), true)
})

test('should return false when not an object', function () {
  t.is(isPlainObject(true), false)
  t.is(isPlainObject(null), false)
  t.is(isPlainObject(/test/), false)
  t.is(isPlainObject(function () {}), false)
  t.is(isPlainObject(1), false)
  t.is(isPlainObject([1]), false)
  t.is(isPlainObject(new Number(1)), false)
})

test('should return false when created with constructor function', function () {
  function Test () {
    this.test = true
  }
  Test.prototype.isTest = true

  t.is(isPlainObject(new Test()), false)
})
