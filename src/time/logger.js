var slice      = require('../array/slice')
var colorz     = require('../util/colorz')
var dateformat = require('../date/dateFormat')

function logger () {
  var args = slice(arguments).join(' ') + '\n'
  var time = colorz.magenta(dateformat('logStamp')) + ' '
  return process.stdout.write(time + args)
}

module.exports = logger
