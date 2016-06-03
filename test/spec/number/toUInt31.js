var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/toUInt31')
var t = painless.assert

var toUInt31 = require('../../../src/number/toUInt31')

test('should remove decimal digits', function(){
  t.is(toUInt31(1.25), 1)
  t.is(toUInt31(0.75), 0)
  t.is(toUInt31(2.999), 2)
  t.is(toUInt31(10.0001), 10)
})

test('should treat negative numbers as zero', function () {
  t.is(toUInt31(-0.55), 0)
  t.is(toUInt31(-5.0001), 0)
  t.is(toUInt31(-9.99999), 0)
})

test('should wrap at 2^31', function () {
  t.is(toUInt31( Math.pow(2,31) + 0.5 ), 0)
  t.is(toUInt31( Math.pow(2,31) + 5.5 ), 5)
  t.is(toUInt31( Math.pow(2,32) - 0.5 ), 2147483647)
})

test('should typecast value to number', function () {
  t.is(toUInt31('123.45'), 123 )
  t.is(toUInt31(null), 0 )
  t.is(toUInt31(void(0)), 0 )
  t.is(toUInt31(''), 0 )
  // we do not use lang/toNumber because of perf and also because it
  // doesn't break the functionality
  t.is(toUInt31([]), 0)
  t.is(toUInt31([4,5]), 0)
  t.is(toUInt31({}), 0)
})
