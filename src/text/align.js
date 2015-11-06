// adopted from: align-text <https://github.com/jonschlinkert/align-text>
// Copyright (c) 2015, Jon Schlinkert. (MIT)

var kindOf = require('../lang/kindOf').type
var longish = require('../array/longish')
var repeat = require('../string/repeat')

function align (val, fn) {
  var lines

  if (Array.isArray(val)) lines = val
  else if (typeof val === 'string') lines = val.split(/(?:\r\n|\n)/)
  else throw new TypeError('expects a string or array')

  var fnType = kindOf(fn)
  var len = lines.length
  var max = longish(lines)
  var res = []
  var i = 0

  while (len--) {
    var line = String(lines[i++])
    var diff

    if (fnType === 'function') {
      diff = fn(line.length, max.length, line, lines, i)
    } else if (fnType === 'number') {
      diff = fn
    } else {
      diff = max.length - line.length
    }

    if (kindOf(diff) === 'number') {
      res.push(repeat(' ', diff) + line)
    } else if (kindOf(diff) === 'object') {
      var result = repeat(diff.character || ' ', diff.indent || 0)
      res.push((diff.prefix || '') + result + line)
    }
  }

  if (Array.isArray(val)) return res
  return res.join('\n')
}

function centered (val) {
  return align(val, function (len, longest) {
    return Math.floor((longest - len) / 2)
  })
}

function right (val) {
  return align(val, function (len, longest) {
    return longest - len
  })
}

function bullets (val) {
  return align(val, function (len, max, line, lines) {
    return {
      prefix: ' - '
    }
  })
}

module.exports = align
module.exports.center = centered
module.exports.right = right
module.exports.list = bullets
