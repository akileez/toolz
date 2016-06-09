'use strict'
var painless = require('../../assertion/painless')
var test = painless.createGroup('Test function/is-arrow-function')
var t = painless.assert

var fn = require('../../../src/function/is-arrow-function')
var forEach = require('../../../src/array/forEach')

var arrowFuncs = [
    Function('return (a, b) => a * b;')(),
    Function('return () => 42;')(),
    Function('return () => function () {};')(),
    Function('return () => x => x * x;')(),
    Function('return x => x * x;')(),
    Function('return x => { return x * x; }')(),
    Function('return (x, y) => { return x + x; }')()
  ]

test('should return false for non-functions', function () {
  var nonFuncs = [
    true,
    false,
    null,
    undefined,
    {},
    [],
    /a/g,
    'string',
    42,
    new Date()
  ]

  forEach(nonFuncs, (nonFunc) => {
    t.notOk(fn(nonFunc))
  })
})

test('should return false for non-arrow functions', function () {
  var func = function () {}
  t.notOk(fn(func))

  var namedFunc = function foo () {}
  t.notOk(fn(namedFunc))
})

test('should return false for non-arrow function with faked toString', function () {
  var func = function () {}
  func.toString = function () {return 'ARROW'}

  t.ne(String(func), Function.prototype.toString.call(func))
  t.notOk(fn(func))
})

test('should return true for arrow functions', function () {
  forEach(arrowFuncs, (afunc) => {
    t.ok(fn(afunc))
  })
})