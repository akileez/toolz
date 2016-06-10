var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/isInteger')
var t = painless.assert

var isInteger = require('../../../src/number/isInteger')

test('should be true if numbers are integers', function () {
  t.true(isInteger(0))
  t.true(isInteger(-0))
  t.true(isInteger(1))
  t.true(isInteger(5034))
  t.true(isInteger(-5034))
  t.true(isInteger(9007199254740991))
  t.true(isInteger(-9007199254740991))
  t.true(isInteger(1.0))
})

test('should be false if numbers are not integers', function () {
  t.false(isInteger(1.1))
  t.false(isInteger(NaN))
  t.false(isInteger(Infinity))
  t.false(isInteger(-Infinity))
  t.false(isInteger(null))
  t.false(isInteger(undefined))
})