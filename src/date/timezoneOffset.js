var pad = require('../number/pad')

// time zone as hour and minute offset from UTC (eg: -0400)

function timezoneOffset (date) {
  var offset = date.getTimezoneOffset()
  var abs = Math.abs(offset)
  var hr = pad(Math.floor(abs / 60), 2)
  var min = pad(abs % 60, 2)
  return [(offset > 0 ? '-' : '+'), hr, min].join('')
}

module.exports = timezoneOffset

// var offset = date.getTimezoneOffset()
// var GMT = (offset > 0 ? '-' : '+') + pad(Math.floor(Math.abs(offset) / 60) * 100 + Math.abs(offset) % 60, 4)