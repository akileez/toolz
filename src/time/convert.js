var has = require('../object/has')

/*
  convert time between units
  Available units: millisecond, second, minute, hour, day, week, year
  Abbreviations: ms, s, m, h, d, w, y

  months are not supported as a time unit since their values are not fixed
  default destinationUnitName is `ms`
*/

var getUnit = {
  'ms'          : 1,
  'millisecond' : 1,
  's'           : 1000,
  'second'      : 1000,
  'm'           : 60000,
  'minute'      : 60000,
  'h'           : 3600000,
  'hour'        : 3600000,
  'd'           : 86400000,
  'day'         : 86400000,
  'w'           : 604800000,
  'week'        : 604800000,
  'y'           : 31557600000,
  'year'        : 31557600000
}

function convert (val, sourceUnitName, destinationUnitName) {
  destinationUnitName = destinationUnitName || 'ms'

  if (!has(getUnit, destinationUnitName)) {
    throw new Error('"' + destinationUnitName + '" is not a valid unit')
  }

  if (!has(getUnit, sourceUnitName)) {
    throw new Error('"' + sourceUnitName + '" is not a valid unit')
  }

  return (val * getUnit[sourceUnitName]) / getUnit[destinationUnitName]
}

module.exports = convert
