var painless = require('../../assertion/painless')
var test = painless.createGroup('Test time/convert')
var t = painless.assert

var convert = require('../../../src/time/convert')

test('should convert value to millisecond by default', function(){
  t.is(convert(1, 'millisecond'), 1)
  t.is(convert(300, 'millisecond'), 300)
  t.is(convert(1, 'second'), 1000)
  t.is(convert(3, 'second'), 3000)
  t.is(convert(2, 'minute'), 120000)
  t.is(convert(1, 'hour'), 3600000)
  t.is(convert(5, 'day'), 86400000 * 5)
  t.is(convert(1, 'week'), 604800000)
})

test('should allow custom destination unit', function () {
  t.is(convert(1, 'second', 'minute'), 1 / 60)
  t.is(convert(2, 'second', 'minute'), 2 / 60)
  t.is(convert(2, 'minute', 'second'), 120)
})

test('should support aliases', function () {
  t.is(convert(0.5, 's', 'ms'), 500)
  t.is(convert(10, 'h', 'm'), 600)
  t.is(convert(2, 'w', 'd'), 14)
})
