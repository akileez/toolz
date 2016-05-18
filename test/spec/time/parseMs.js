var painless = require('../../assertion/painless')
var test = painless.createGroup('Test time/parseMs')
var t = painless.assert

var parseMs = require('../../../src/time/parseMs')

test('should handle milliseconds to seconds', function(){
  var time = parseMs(999);

  t.is(time.milliseconds, 999)
  t.is(time.seconds, 0)
  t.is(time.minutes, 0)
  t.is(time.hours, 0)
  t.is(time.days, 0)

  time = parseMs(1000);

  t.is(time.milliseconds, 0)
  t.is(time.seconds, 1)
  t.is(time.minutes, 0)
  t.is(time.hours, 0)
  t.is(time.days, 0)

  time = parseMs(1001);

  t.is(time.milliseconds, 1)
  t.is(time.seconds, 1)
  t.is(time.minutes, 0)
  t.is(time.hours, 0)
  t.is(time.days, 0)
})

test('should handle seconds to minutes', function(){
  var time = parseMs(59999);

  t.is(time.milliseconds, 999)
  t.is(time.seconds, 59)
  t.is(time.minutes, 0)
  t.is(time.hours, 0)
  t.is(time.days, 0)

  time = parseMs(60000);

  t.is(time.milliseconds, 0)
  t.is(time.seconds, 0)
  t.is(time.minutes, 1)
  t.is(time.hours, 0)
  t.is(time.days, 0)

  time = parseMs(61000);

  t.is(time.milliseconds, 0)
  t.is(time.seconds, 1)
  t.is(time.minutes, 1)
  t.is(time.hours, 0)
  t.is(time.days, 0)
})

test('should handle minutes to hours', function(){
  var time = parseMs(3599999);

  t.is(time.milliseconds, 999)
  t.is(time.seconds, 59)
  t.is(time.minutes, 59)
  t.is(time.hours, 0)
  t.is(time.days, 0)

  time = parseMs(3600000);

  t.is(time.milliseconds, 0)
  t.is(time.seconds, 0)
  t.is(time.minutes, 0)
  t.is(time.hours, 1)
  t.is(time.days, 0)

  time = parseMs(3660000);

  t.is(time.milliseconds, 0)
  t.is(time.seconds, 0)
  t.is(time.minutes, 1)
  t.is(time.hours, 1)
  t.is(time.days, 0)
})

test('should handle hours to days', function(){
  var time = parseMs(86399999);

  t.is(time.milliseconds, 999)
  t.is(time.seconds, 59)
  t.is(time.minutes, 59)
  t.is(time.hours, 23)
  t.is(time.days, 0)

  time = parseMs(86400000);

  t.is(time.milliseconds, 0)
  t.is(time.seconds, 0)
  t.is(time.minutes, 0)
  t.is(time.hours, 0)
  t.is(time.days, 1)

  time = parseMs(90000000);

  t.is(time.milliseconds, 0)
  t.is(time.seconds, 0)
  t.is(time.minutes, 0)
  t.is(time.hours, 1)
  t.is(time.days, 1)
})
