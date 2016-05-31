var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/sign')
var t = painless.assert

var sign = require('../../../src/number/sign')
var isNaN = require('../../../src/number/isNaN')

test('should return -1 if number is negative', function () {
  t.is(sign(-123), -1)
  t.is(sign(-0.5), -1)
  t.is(sign(-Math.pow(2, 32)), -1)
})

test('should return +1 if number is positive', function () {
  t.is(sign(123), 1)
  t.is(sign(0.5), 1)
  t.is(sign(Math.pow(2, 32)), 1)
})

test('should return 0 if number is 0', function () {
  t.is(sign(0), 0)
})

test('should return +0 if number is +0', function () {
  t.is(1 / sign(+0), Infinity)
})

test('should return -0 if number is -0', function () {
  t.is(1 / sign(-0), -Infinity)
})

test('should return NaN if value is NaN', function () {
  t.assert(isNaN(sign(NaN)))
})

test('should return NaN if value is not a Number', function () {
  t.assert(isNaN(sign('foo')))
})

test('should typecast value into a number', function () {
  t.is(sign('-123'), -1)
  t.is(sign('123'), 1)
  t.is(sign(''), 0)
  t.is(sign(null), 0)
  t.is(sign(undefined), 0)
  t.assert(isNaN(sign([])))
  t.assert(isNaN(sign([1])))
})
