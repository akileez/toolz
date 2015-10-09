// adopted from: https://github.com/jonschlinkert/word-wrap
// Copyright (c) 2014-2015, Jon Schlinkert and contributors (MIT)
// originally adopted from: Adapted from http://james.padolsey.com/javascript/wordwrap-for-javascript/
var identity = require('../function/identity')

function wordwrap (str, opts) {
  opts = opts || {}
  if (str == null) return str

  var width = opts.width || 50
  var indent = (typeof opts.indent === 'string')
    ? opts.indent
    : '  '

  var newline = opts.newline || '\n' + indent
  var esc = typeof opts.escape === 'function'
    ? opts.escape
    : identity

  var re = new RegExp('.{1,' + width + '}(\\s+|$)|\\S+?(\\s+|$)', 'g')

  if (opts.cut) re = new RegExp('.{1,' + width + '}', 'g')

  var lines = str.match(re) || []
  var result = indent + lines.map(esc).join(newline)

  if (opts.trim === true) result = result.replace(/[ \t]*$/gm, '')

  return result
}

module.exports = wordwrap
