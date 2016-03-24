var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/isInteger')
var t = painless.assert

var isInteger = require('../../src/lang/isInteger')

test('should return false if value isn\'t an integer', function(){
  t.is(isInteger(false), false)
  t.is(isInteger(true), false)
  t.is(isInteger('foo'), false)
  t.is(isInteger('123'), false)
  t.is(isInteger('123.45'), false)
  t.is(isInteger(123.45), false)
  t.is(isInteger(-0.45), false)
  t.is(isInteger(new Number(-0.45)), false)
  t.is(isInteger(new Date()), false)
  t.is(isInteger(/foo/), false)
  t.is(isInteger({}), false)
  t.is(isInteger({valueOf:function(){return 123;}}), false)
  t.is(isInteger(Infinity), false)
  t.is(isInteger(-Infinity), false)
});


test('should return true if value is an integer', function () {
  t.is(isInteger(0), true)
  t.is(isInteger(1), true)
  t.is(isInteger(123), true)
  t.is(isInteger(-123), true)
  // using typeof check for integer. new Number is an object
  t.is(isInteger(new Number(-123)), false)
});


test('should work even with large numbers', function () {
  t.is(isInteger(Math.pow(2,45) + 0.05), false)
  t.is(isInteger(Math.pow(2,45) - 0.05), false)
  t.is(isInteger(Math.pow(2,45)), true)
  t.is(isInteger(-Math.pow(2,45)), true)
});
