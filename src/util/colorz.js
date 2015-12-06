var styles  = require('../string/ansiStyles')
var forEach = require('../array/forEach')
var keys    = require('../object/keys')

var colorz = {}

forEach(keys(styles), function (style) {
  var open = '\u001b[' + styles[style][0] + 'm'
  var clos = '\u001b[' + styles[style][1] + 'm'

  colorz[style] = function (msg) {
    return open + msg + clos
  }
})

function strip (str) {
  return str.replace(/(?:\u001b\[)\d+m/g, '')
}

function expose (style, str, noColor) {
  if (typeof str === 'boolean') {
    noColor = str
    str = 'Hello World'
  }

  str = str || 'Hello World'

  return noColor
    ? style + ': ' + JSON.stringify(colorz[style](str))
    : style + ': '
      + JSON.stringify(colorz[style](str))
      .replace(/(\\u001b\[\d+m)/g, colorz[style](['$1']))
}

function colorize (str, style) {
  if (!style) return str

  if (Array.isArray(style) && style.length > 1) {
    return colorize(colorz[style[0]](str), style.slice(1))
  } else {
    return colorz[Array.isArray(style) ? style[0] : style](str)
  }
}

module.exports = colorz
module.exports.strip = strip
module.exports.expose = expose
module.exports.colorize = colorize
module.exports.format = colorize
