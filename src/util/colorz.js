var styles = require('../string/ansiStyles')
var keys = require('../object/keys')
var forEach = require('../array/forEach')

var ansi = {}

forEach(keys(styles), function (style) {
  var open = ['\u001b[', styles[style][0], 'm'].join('')
  var clos = ['\u001b[', styles[style][1], 'm'].join('')

  ansi[style] = function (msg) {
    return [open, msg, clos].join('')
  }
})

ansi.strip = function (str) {
  return str.replace(/(?:\u001b\[)\d+m/g, '')
}

ansi.expose = function (style) {
  return [style, ': ', JSON.stringify(ansi[style](' ++string++ '))].join('')
}

module.exports = ansi