// adopted from: wordwrapjs <https://github.com/75lb/wordwrapjs>
// Copyright (c) 2015 Lloyd Brookes <75pound@gmail.com> (MIT)

// differs by adding indent option, removing option setting inside functions,
// removing os.EOL setting (using a string) and declaring a wrapLines function
// as opposed to variable assignment.

// slower than https://github.com/jonschlinkert/word-wrap
// previous version approx 85% slower, now approx 30% slower

var forEach = require('../array/forEach')
var toArray = require('../lang/toArray')

function wrap (text, opts) {
  opts = defaultOpts(opts)

  var lines = wrapLines(text, opts)
  return lines.join(opts.eol)
}

function wrapLines (text, opts) {
  var words = text.split(/\s+/)
  var lineLength = 0
  var lines = []
  var line = ''

  forEach(words, function (word) {
    var wordLength = opts.ignore
      ? replaceIgnored(word, opts.ignore).length
      : word.length

    lineLength += wordLength + (line ? 1 : 0)

    if (lineLength > opts.width) {
      // Can't fit word on line, cache line and create new one
      lines.push(opts.indent + line)
      line = word
      lineLength = wordLength
    } else {
      line += (line ? ' ' : '') + word
    }
  })

  if (line) lines.push(opts.indent + line)

  return lines
}

function replaceIgnored (string, ignore) {
  toArray(ignore).forEach(function (pattern) {
    string = string.replace(pattern, '')
  })
  return string
}

function defaultOpts (opts) {
  opts = opts || {}
  opts.width = opts.width || 50
  opts.indent = opts.indent || ''
  opts.eol = opts.eol || '\n'
  return opts
}

module.exports = wrap
