var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/toUInt')
var t = painless.assert

var toUInt = require('../../../src/number/toUInt')

var max_uint = 4294967295;

test('should remove decimal digits', function(){
  t.is(toUInt(1.25), 1)
  t.is(toUInt(0.75), 0)
  t.is(toUInt(2.999), 2)
  t.is(toUInt(10.0001), 10)
})

test('negative numbers should be subtracted from MAX_UINT + 1 (wrap at zero) - similar to AS3 `uint(val)`', function () {
  t.is(toUInt(-0.55), 0)
  t.is(toUInt(-5.0001), max_uint - 5 + 1)
  t.is(toUInt(-9.99999), max_uint - 9 + 1)
})

test('should wrap at 2^32', function () {
  t.is(toUInt(Math.pow(2,31) + 0.5 ), 2147483648)
  t.is(toUInt(Math.pow(2,31) + 5.5 ), 2147483653)
  t.is(toUInt(Math.pow(2,32) - 0.5 ), 4294967295)
  t.is(toUInt(Math.pow(2,32) + 0.5 ), 0)
  t.is(toUInt(Math.pow(2,32) + 5.5 ), 5)
  t.is(toUInt(Math.pow(2,33) - 0.5 ), 4294967295)
  t.is(toUInt(Math.pow(2,33) + 5.5 ), 5)
})

test('should typecast value to number', function () {
  t.is(toUInt('123.45'), 123)
  t.is(toUInt(null), 0)
  t.is(toUInt(void(0)), 0)
  // we do not use lang/toNumber because of perf and also because it
  // doesn't break the functionality
  t.is(toUInt(''), 0)
  t.is(toUInt([]), 0)
  t.is(toUInt([4,5]), 0)
  t.is(toUInt({}), 0)
})
