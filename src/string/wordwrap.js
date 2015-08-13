// adopted from: https://github.com/jonschlinkert/word-wrap
// Copyright (c) 2014-2015, Jon Schlinkert and contributors (MIT)
// originally adopted from: Adapted from http://james.padolsey.com/javascript/wordwrap-for-javascript/

function wordwrap (str, opts) {
  opts = opts || {}
  if (str == null) return str

  var width = opts.width || 50
  var indent = (typeof opts.index === 'string')
    ? opts.indent
    : '  '

  var newline = opts.newline || '\n' + indent
  var re = new RegExp('.{1,' + width + '}(\\s+|$)|\\S+?(\\s+|$)', 'g')

  if (opts.cut) re = new RegExp('.{1,' + width + '}', 'g')

  var lines = str.match(re) || []
  var result = indent + lines.join(newline)

  if (opts.trim === true) result = result.replace(/[ \t]*$/gm, '')

  return result
}

module.exports = wordwrap
