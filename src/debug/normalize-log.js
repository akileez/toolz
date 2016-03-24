var colorz = require('../util/colorz')
var lengthOf = require('../string/string-length')

var maxlength = 10

exports.info = function (name, description) {
  console.log(pad(name) + ' ' + description)
}

exports.error = function (name, description) {
  if (!description) {
    description = name
    name = colorz.red('error')
  }
  if ((description instanceof Error)) {
    if (description.stack) description = description.stack.replace(/^/gm, '         ').trim()
    else description = description.message
  }
  console.error(pad(name) + ' ' + description)
}

function pad(string) {
  var length = lengthOf(string)
  var i = maxlength - length
  while (i-- > 0) string = ' ' + string
  return string
}