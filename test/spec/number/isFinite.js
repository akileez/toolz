var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/isFinite')
var t = painless.assert

var isFinite = require('../../../src/number/isFinite')

test('test', () => {
  t.true(isFinite(0))
  t.true(isFinite(100))
  t.true(isFinite(-100))
  t.true(isFinite(4e44))
  t.false(isFinite('0'))
  t.false(isFinite(NaN))
  t.false(isFinite(undefined))
  t.false(isFinite(Infinity))
  t.false(isFinite(-Infinity))
})