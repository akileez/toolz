var painless = require('../../assertion/painless')
var test = painless.createGroup('Test time/nano')
var t = painless.assert

var nano = require('../../../src/time/nano')

// https://github.com/seriousManual/hrtimemock
function hrtimeMock(msTime) {
  var _hrtime = process.hrtime;

  var returnValue = [
  parseInt(msTime / 1e3, 10),
  (msTime % 1000) * 1e6
  ];

  var isFirst = true;
  process.hrtime = function() {
    if(isFirst) {
      isFirst = false;

      return [];
    } else {
      isFirst = true;
      process.hrtime = _hrtime;

      return returnValue;
    }
  }
}

test('should return time value in milliseconds', function () {
  hrtimeMock(1000)
  var strt = process.hrtime()
  var end = process.hrtime(strt)

  t.is(nano(end), 1000)
})

test('should convert to seconds', function () {
  hrtimeMock(532)
  var strt = process.hrtime()
  var end = process.hrtime(strt)

  t.is(nano(end, 's'), 0.532)
})

test('should return time precision of 2', function () {
  hrtimeMock(532.123)
  var strt = process.hrtime()
  var end = process.hrtime(strt)

  t.is(nano(end, 2), 532.12)
})