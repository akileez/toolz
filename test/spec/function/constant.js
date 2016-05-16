'use strict'
var painless = require('../../assertion/painless')
var test = painless.createGroup('Test function/constant')
var t = painless.assert

var constant = require('../../../src/function/constant')

test('should return new function that returns a value', function () {
  var f = constant(1)
  t.is(f(), 1)
  t.is(f(2), 1)
  t.is(f.call({}), 1)

  f = constant('foo')
  t.is(f(), 'foo')
})

test('should return exact object', function () {
  var obj = {}
  var f = constant(obj)

  t.same(f(), obj)
})

test('should handle null and undefined', function () {
  var f = constant(null)
  t.is(f(), null)

  f = constant()
  t.is(f(), undefined)
})
