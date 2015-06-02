var countSteps = require('../math/countSteps')
var pad        = require('../number/pad')

var HOUR   = 3600000
var MINUTE = 60000
var SECOND = 1000

// format timestamp into a time string

function toTimeString (ms) {
  var h = ms < HOUR   ? 0 : countSteps(ms, HOUR)
  var m = ms < MINUTE ? 0 : countSteps(ms, MINUTE, 60)
  var s = ms < SECOND ? 0 : countSteps(ms, SECOND, 60)
  var str = ''

  str += h ? h + ':' : ''
  str += pad(m, 2) + ':'
  str += pad(s, 2)

  return str
}

module.exports = toTimeString
