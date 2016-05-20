var painless = require('../../assertion/painless')
var test = painless.createGroup('Test math/loop')
var t = painless.assert

var loop = require('../../../src/math/loop')

test('should return `min` if `val` is bigger than `max`', function(){
  t.is(loop(11, 0, 10), 0)
  t.is(loop(9999999, 999, 9999), 999)
  t.is(loop(-500, -1000, -750), -1000)
})

test('should return `max` if `val` is smaller than `min`', function(){
  t.is(loop(-1, 0, 10), 10)
  t.is(loop(99, 999, 9999), 9999)
  t.is(loop(-1005, -1000, -750), -750)
})

test('should return val if inside range', function(){
  t.is(loop(6, 1, 10), 6)
  t.is(loop(55, 1, 100), 55)
  t.is(loop(0, -50, 50), 0)
  t.is(loop(-6, -10, -2), -6)

  t.is(loop(10, - Number.MAX_VALUE, Number.MAX_VALUE), 10)
  t.is(loop(1234567890, - Number.MAX_VALUE, Number.MAX_VALUE), 1234567890)
})
