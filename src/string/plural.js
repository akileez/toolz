// adopted from: https://github.com/sindresorhus/plur
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com) (MIT)
var irregularPlurals = require('./IRREGULAR-PLURALS')

function plural (str, plur, count) {
  if (typeof plur === 'number') count = plur

  if (str in irregularPlurals) plur = irregularPlurals[str]
  else if (typeof plur !== 'string') {
    plur = (str.replace(/(?:s|x|z|ch|sh)$/i, '$&e')
      .replace(/([^aeiou])y$/i, '$1ie') + 's')
      .replace(/i?e?s$/i, function (m) {
        var isTailLowerCase = str.slice(-1) === str.slice(-1).toLowerCase()
        return isTailLowerCase ? m.toLowerCase() : m.toUpperCase()
      })
  }

  return count === 1 ? str : plur
}

module.exports = plural
