// adopted from: regex-flags <https://github.com/jonschlinkert/regex-flags>
// Copyright (c) 2015, Jon Schlinkert. (MIT)

var flags = {
  global     : 'g',
  ignoreCase : 'i',
  multiline  : 'm',
  unicode    : 'u',
  sticky     : 'y'
}

function regexFlags (regex) {
  var res = ''
  Object.keys(flags).forEach(function (flag) {
    if (flags.hasOwnProperty(flag) && regex[flag])
      res += flags[flag]
  })
  return res
}

module.exports = regexFlags
