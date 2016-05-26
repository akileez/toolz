var painless = require('../../assertion/painless')
var test = painless.createGroup('Test time/timeFormat')
var t = painless.assert

var timeFormat = require('../../../src/time/timeFormat')

test('should prettify milliseconds', function () {
  t.is(timeFormat(0), '0ms');
  t.is(timeFormat(0.1), '1ms');
  t.is(timeFormat(1), '1ms');
  t.is(timeFormat(1000 + 400), '1.4s');
  t.is(timeFormat(1000 * 2 + 400), '2.4s');
  t.is(timeFormat(1000 * 55), '55s');
  t.is(timeFormat(1000 * 67), '1m 7s');
  t.is(timeFormat(1000 * 60 * 5), '5m');
  t.is(timeFormat(1000 * 60 * 67), '1h 7m');
  t.is(timeFormat(1000 * 60 * 60 * 12), '12h');
  t.is(timeFormat(1000 * 60 * 60 * 40), '1d 16h');
  t.is(timeFormat(1000 * 60 * 60 * 999), '41d 15h');
});

test('should have a compact option', function () {
  t.is(timeFormat(1000 + 4, {compact: true}), '~1s');
  t.is(timeFormat(1000 * 60 * 60 * 999, {compact: true}), '~41d');
});

test('should have a secDecimalDigits option', function () {
  t.is(timeFormat(33333), '33.3s');
  t.is(timeFormat(33333, {secDecimalDigits: 0}), '33s');
  t.is(timeFormat(33333, {secDecimalDigits: 4}), '33.3330s');
});

test('should have a msDecimalDigits option', function () {
  t.is(timeFormat(33.333), '34ms');
  t.is(timeFormat(33.333, {msDecimalDigits: 0}), '34ms');
  t.is(timeFormat(33.333, {msDecimalDigits: 4}), '33.3330ms');
});

test('should have a verbose option', function () {
  var fn = function (ms) {
    return timeFormat(ms, {verbose: true});
  };

  t.is(fn(0), '0 milliseconds');
  t.is(fn(0.1), '1 millisecond');
  t.is(fn(1), '1 millisecond');
  t.is(fn(1000), '1 second');
  t.is(fn(1000 + 400), '1.4 seconds');
  t.is(fn(1000 * 2 + 400), '2.4 seconds');
  t.is(fn(1000 * 5), '5 seconds');
  t.is(fn(1000 * 55), '55 seconds');
  t.is(fn(1000 * 67), '1 minute 7 seconds');
  t.is(fn(1000 * 60 * 5), '5 minutes');
  t.is(fn(1000 * 60 * 67), '1 hour 7 minutes');
  t.is(fn(1000 * 60 * 60 * 12), '12 hours');
  t.is(fn(1000 * 60 * 60 * 40), '1 day 16 hours');
  t.is(fn(1000 * 60 * 60 * 999), '41 days 15 hours');
});

test('should work with verbose and compact options', function () {
  var fn = function (ms) {
    return timeFormat(ms, {
      verbose: true,
      compact: true
    });
  };

  t.is(fn(1000), '~1 second');
  t.is(fn(1000 + 400), '~1 second');
  t.is(fn(1000 * 2 + 400), '~2 seconds');
  t.is(fn(1000 * 5), '~5 seconds');
  t.is(fn(1000 * 55), '~55 seconds');
  t.is(fn(1000 * 67), '~1 minute');
  t.is(fn(1000 * 60 * 5), '~5 minutes');
  t.is(fn(1000 * 60 * 67), '~1 hour');
  t.is(fn(1000 * 60 * 60 * 12), '~12 hours');
  t.is(fn(1000 * 60 * 60 * 40), '~1 day');
  t.is(fn(1000 * 60 * 60 * 999), '~41 days');
});

test('should work with verbose and secDecimalDigits options', function () {
  var fn = function (ms) {
    return timeFormat(ms, {
      verbose: true,
      secDecimalDigits: 4
    });
  };

  t.is(fn(1000), '1.0000 second');
  t.is(fn(1000 + 400), '1.4000 seconds');
  t.is(fn(1000 * 2 + 400), '2.4000 seconds');
  t.is(fn(1000 * 5 + 254), '5.2540 seconds');
  t.is(fn(33333), '33.3330 seconds');
});

test('should work with verbose and msDecimalDigits options', function () {
  var fn = function (ms) {
    return timeFormat(ms, {
      verbose: true,
      msDecimalDigits: 4
    });
  };

  t.is(fn(1), '1.0000 millisecond');
  t.is(fn(1 + 0.4), '1.4000 milliseconds');
  t.is(fn(1 * 2 + 0.400), '2.4000 milliseconds');
  t.is(fn(1 * 5 + 0.254), '5.2540 milliseconds');
  t.is(fn(33.333), '33.3330 milliseconds');
});

test('should throw on invalid', function () {
  t.throws(function () {
    timeFormat('foo');
  });

  t.throws(function () {
    timeFormat(NaN);
  });

  t.throws(function () {
    timeFormat(Infinity);
  });
});
