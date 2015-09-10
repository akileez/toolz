// adopted from: https://github.com/sindresorhus/plur
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com) (MIT)
var contains = require('../regex/contains')

function plural (str, plur, count) {
  if (typeof plur === 'number') {
    count = plur
    plur = str.replace(/(?:s|x|z|ch|sh)$/i, '$&e')

    plur = contains(/(?:[aeiou])y$/i, plur)
      ? plur + 's'
      : plur.replace(/y$/i, 'ie') + 's'

    plur = plur.replace(/i?e?s$/i, function (m) {
        var isTailLowerCase = str.slice(-1) === str.slice(-1).toLowerCase()
        return isTailLowerCase ? m.toLowerCase() : m.toUpperCase()
      })
  }
  return count === 1 ? str : plur
}

module.exports = plural
