var painless = require('../../assertion/painless')
var test = painless.createGroup('Test time/toTimeString')
var t = painless.assert

var toTimeString = require('../../../src/time/toTimeString')

test('should convert to proper units', function(){
  t.is(toTimeString(999), '00:00')
  t.is(toTimeString(1000), '00:01')
  t.is(toTimeString(11000), '00:11')
  t.is(toTimeString(71000), '01:11')
  t.is(toTimeString(3671000), '1:01:11')
})

test('should work for large numbers', function(){
  t.is(toTimeString(86400000), '24:00:00')
  t.is(toTimeString(86400000 * 7), '168:00:00')
})
