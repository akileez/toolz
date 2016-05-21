var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/toInt')
var t = painless.assert

var toInt = require('../../../src/number/toInt')

test('should remove decimal digits', function(){
  t.is(toInt(1.25), 1)
  t.is(toInt(0.75), 0)
  t.is(toInt(-0.55), 0)
  t.is(toInt(2.999), 2)
  t.is(toInt(10.0001), 10)
  t.is(toInt(-5.0001), -5)
  t.is(toInt(-9.99999), -9)
})

test('should wrap at MAX_INT and MIN_INT', function(){
  t.is(toInt( Math.pow(2,31) - 1.5 ), 2147483646)
  t.is(toInt( Math.pow(2,31) + 0.5 ), -2147483648)
  t.is(toInt( Math.pow(-2,31) - 1.5 ), 2147483647)
  t.is(toInt( Math.pow(-2,31) - 0.5 ), -2147483648)
  t.is(toInt( Math.pow(-2,31) + 0.5 ), -2147483647)
})

test('should typecast value to number', function () {
  t.is(toInt('123.45'), 123)
  t.is(toInt(null), 0)
  // we do not use lang/toNumber because of perf and also because it
  // doesn't break the functionality
  t.is(toInt(void(0)), 0)
  t.is(toInt(''), 0)
  t.is(toInt([]), 0)
  t.is(toInt([4,5]), 0)
  t.is(toInt({}), 0)
})
