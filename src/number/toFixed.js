var precise = require('./enforcePrecision')
var isNumber = require('./isNumber')
var toString = require('../lang/toString')
var contains = require('../string/contains')
var pad = require('./pad')

function toFixed (num, precision, units) {
  var str = num.toString()

  if (contains(str, '.')) {
    var sub = toString('.')
    var len = str.length
    var idx = str.indexOf(sub, 0) + 1
    var dec = len - idx
    var sgn = str.charAt[0] === '-' ? -1 : 0
  }

  units = isNumber(+units) ? +units : len - dec - sgn//dec ? len - dec - sgn : 0
  num = precise(num, precision ? precision : dec ? dec : 0)

  // num = Array(units).join(' ').slice(num.length) + num


  return pad(num, units, ' ')
}

module.exports = toFixed
