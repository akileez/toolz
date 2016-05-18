var painless = require('../../assertion/painless')
var test1 = painless.createGroup('Test time/ms - convert string')
var test2 = painless.createGroup('Test time/ms - numbers - option: long')
var test3 = painless.createGroup('Test time/ms - numbers - option: short')
var t = painless.assert

var ms = require('../../../src/time/ms')

test1('should preserve ms', function () {
  t.is(ms('100'), 100)
})

test1('should convert from m to ms', function () {
  t.is(ms('1m'), 60000)
})

test1('should convert from h to ms', function () {
  t.is(ms('1h'), 3600000)
})

test1('should convert d to ms', function () {
  t.is(ms('2d'), 172800000)
})

test1('should convert s to ms', function () {
  t.is(ms('1s'), 1000)
})

test1('should convert ms to ms', function () {
  t.is(ms('100ms'), 100)
})

test1('should work with decimals', function () {
  t.is(ms('1.5h'), 5400000)
})

test1('should work with multiple spaces', function () {
  t.is(ms('1   s'), 1000)
})

test1('should return NaN if invalid', function () {
  t.is(isNaN(ms('☃')), true)
})

test1('should be case-insensitive', function () {
  t.is(ms('1.5H'), 5400000)
})

test1('should work with numbers starting with .', function () {
  t.is(ms('.5ms'), 0.5)
})

// long strings
test1('should convert milliseconds to ms', function () {
  t.is(ms('53 milliseconds'), 53)
})

test1('should convert msecs to ms', function () {
  t.is(ms('17 msecs'), 17)
})

test1('should convert sec to ms', function () {
  t.is(ms('1 sec'), 1000)
})

test1('should convert secs to ms', function () {
  t.is(ms('3 secs'), 3000)
})

test1('should convert second to ms', function () {
  t.is(ms('1 second'), 1000)
})

test1('should convert seconds to ms', function () {
  t.is(ms('2 seconds'), 2000)
})

test1('should convert from min to ms', function () {
  t.is(ms('1 min'), 60000)
})

test1('should convert from mins to ms', function () {
  t.is(ms('2 mins'), 120000)
})

test1('should convert from minute to ms', function () {
  t.is(ms('1 minute'), 60000)
})

test1('should convert from minutes to ms', function () {
  t.is(ms('3 minutes'), 180000)
})

test1('should convert from hr to ms', function () {
  t.is(ms('1 hr'), 3600000)
})

test1('should convert days to ms', function () {
  t.is(ms('2 days'), 172800000)
})

test1('should convert years to ms', function () {
  t.is(ms('1 y'), 31557600000)
  t.is(ms('1 yr'), 31557600000)
  t.is(ms('2 yrs'), 63115200000)
  t.is(ms('1 year'), 31557600000)
  t.is(ms('2 years'), 63115200000)
})

test1('should work with decimals', function () {
  t.is(ms('1.5 hours'), 5400000)
})

// numbers

test2('should support milliseconds', function () {
  t.is(ms(500, {long: true}), '500 ms')
})

test2('should support seconds', function () {
  t.is(ms(1000, {long: true}), '1 second')
  t.is(ms(1200, {long: true}), '1 second')
  t.is(ms(10000, {long: true}), '10 seconds')
})

test2('should support minutes', function () {
  t.is(ms(60 * 1000, {long: true}), '1 minute')
  t.is(ms(60 * 1200, {long: true}), '1 minute')
  t.is(ms(60 * 10000, {long: true}), '10 minutes')
})

test2('should support hours', function () {
  t.is(ms(60 * 60 * 1000, {long: true}), '1 hour')
  t.is(ms(60 * 60 * 1200, {long: true}), '1 hour')
  t.is(ms(60 * 60 * 10000, {long: true}), '10 hours')
})

test2('should support days', function () {
  t.is(ms(24 * 60 * 60 * 1000, {long: true}), '1 day')
  t.is(ms(24 * 60 * 60 * 1200, {long: true}), '1 day')
  t.is(ms(24 * 60 * 60 * 10000, {long: true}), '10 days')
})

test2('should round', function () {
  t.is(ms(234234234, {long: true}), '3 days')
})

test3('should support milliseconds', function () {
  t.is(ms(500), '500ms')
})

test3('should support seconds', function () {
  t.is(ms(1000), '1s')
  t.is(ms(10000), '10s')
})

test3('should support minutes', function () {
  t.is(ms(60 * 1000), '1m')
  t.is(ms(60 * 10000), '10m')
})

test3('should support hours', function () {
  t.is(ms(60 * 60 * 1000), '1h')
  t.is(ms(60 * 60 * 10000), '10h')
})

test3('should support days', function () {
  t.is(ms(24 * 60 * 60 * 1000), '1d')
  t.is(ms(24 * 60 * 60 * 10000), '10d')
})

test3('should round', function () {
  t.is(ms(234234234), '3d')
})
