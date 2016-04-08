function stripAnsi (str) {
  return typeof str === 'string' ? str.replace(ansiRegex(), '') : str;
};

function ansiRegex () {
  return /\u001b\[(?:[0-9]{1,3}(?:;[0-9]{1,3})*)?[m|K]/g;
};

var codePointAt = require('./code-point-at')
var isFullWidthCodePoint = require('./is-fullwidth-code-point')

function stringWidth (str) {
  if (typeof str !== 'string' || str.length === 0) return 0

  var width = 0
  str = stripAnsi(str)
  var i = -1
  var len = str.length

  while (++i < len) {
    var code = codePointAt(str, i)
    if (code >= 0x10000) ++i
    if (isFullWidthCodePoint(code)) width += 2
    else width++
  }

  return width
}

module.exports = stringWidth
