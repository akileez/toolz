var precise = require('../number/enforcePrecision')

/*
  convert a high resolution time in nanoseconds to another unit of time

  val            : high resolution time diff (process.hrtime(process.hrtime())
  conversionUnit : convert to specified time units. default: milliseconds
  precision      : number of decimal places. default: 3

  ------------------------------------------------------------------------

  var convert = require('nano')
  var start = process.hrtime()

  process.nextTick(() => {
    var end = process.hrtime(start)
    console.log('elasped time took %d seconds', convert(end))
    // or for second convertison with 9 decimal places
    console.log('elasped time took %d seconds', convert(end, 's', 9))
  })

*/

function convertDiff (diffHRTimes, conversionUnit, precision) {
  function nano (time) {
    return time[0] * 1e9 + time[1]
  }

  if (arguments.length === 2 && typeof conversionUnit === 'number') {
    precision = conversionUnit
    conversionUnit = 's'
  }

  conversionUnit = conversionUnit || 'ms'
  precision = precision || 3

  var getUnit = {
    'm'      : 6e10,
    'minute' : 6e10,
    's'      : 1e9,
    'second' : 1e9,
    'ms'     : 1e6,
    'milli'  : 1e6,
    'µs'     : 1e3,
    'micro'  : 1e3,
    'ns'     : 1,
    'nano'   : 1
  }

  return precise(nano(diffHRTimes) / getUnit[conversionUnit], precision)
}

module.exports = convertDiff
