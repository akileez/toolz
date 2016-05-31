var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/pad')
var t = painless.assert

var pad = require('../../../src/number/pad')

test('should add zeroes if number length is < minLength', function(){
  t.is(pad(15, 0), '15')
  t.is(pad(15, 1), '15')
  t.is(pad(15, 2), '15')
  t.is(pad(15, 3), '015')
  t.is(pad(15, 4), '0015')
})

test('should allow custom pad char', function () {
  t.is(pad(15, 4, '_'), '__15')
})

test('should typecast value to number', function () {
  t.is(pad(null, 2), '00')
  t.is(pad('', 2), '00')
  t.is(pad('1', 2), '01')
})
