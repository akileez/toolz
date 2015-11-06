// adopted from: regex-flags <https://github.com/jonschlinkert/regex-flags>
// Copyright (c) 2015, Jon Schlinkert. (MIT)

var keys = require('../object/keys')
var forEach = require('../array/forEach')

var flags = {
  global     : 'g',
  ignoreCase : 'i',
  multiline  : 'm',
  unicode    : 'u',
  sticky     : 'y'
}

function regexFlags (regex) {
  var res = ''
  forEach(keys(flags), function (flag) {
    if (regex[flag]) res += flags[flag]
  })
  return res
}

module.exports = regexFlags
