var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/isFloat')
var t = painless.assert

var isFloat = require('../../../src/number/isFloat')

test('should be floating point numbers', function () {
  t.true(isFloat(1.1))
  t.true(isFloat(-1.1))
  t.true(isFloat(Number.MAX_VALUE - 0.1))
})

test('should not be floating point numbers', function () {
  t.false(isFloat(1))
  t.false(isFloat(NaN))
  t.false(isFloat(Infinity))
  t.false(isFloat(-Infinity))
  t.false(isFloat(null))
  t.false(isFloat(undefined))
})