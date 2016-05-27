var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/isOdd')
var t = painless.assert

var isOdd = require('../../../src/number/isOdd')

test('should return true if the number is odd:', function () {
  t.false(isOdd(0))
  t.false(isOdd(2))
  t.false(isOdd(4))
  t.true(isOdd(1))
  t.true(isOdd(3))
  t.true(isOdd(5))
})

test('should work with strings:', function () {
  t.false(isOdd('0'))
  t.false(isOdd('2'))
  t.true(isOdd('1'))
  t.true(isOdd('3'))
})
