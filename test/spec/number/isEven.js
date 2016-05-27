var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/isEven')
var t = painless.assert

var isEven = require('../../../src/number/isEven')

test('should return true if the number is even:', function () {
  t.true(isEven(0))
  t.true(isEven(2))
  t.true(isEven(4))
  t.false(isEven(1))
  t.false(isEven(3))
  t.false(isEven(5))
})

test('should work with strings:', function () {
  t.true(isEven('0'))
  t.true(isEven('2'))
  t.false(isEven('1'))
  t.false(isEven('3'))
})
