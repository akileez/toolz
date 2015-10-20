// adopted from: wordwrapjs <https://github.com/75lb/wordwrapjs>
// Copyright (c) 2015 Lloyd Brookes <75pound@gmail.com> (MIT)

// differs by adding indent option, removing option setting inside functions,
// removing os.EOL setting (using a string) and declaring a wrapLines function
// as opposed to variable assignment. Also no input text validation.

// [opts] {object} -- optional config
// [opts.width=50] {number} -- max column width in characters
// [opts.break] {boolean} -- if true, words exceeding the specified width will
// be forcefully broken.
// [opts.ignore] {RegExp | RegExp[]} -- one or more patterns to be ignored when
// sizing the newly wrapped line. For example `ignore: /\u001b.*?m/g`
// will ignore unprintable ansi escape sequences.
// [opts.eol='\n'] {string} -- the desired new line character to use.
// [opts.indent=''] {string} -- the desired number of spaces/tabs character to use
// for indenting the given text.

var forEach = require('../array/forEach')
var toArray = require('../lang/toArray')

function wrap (text, opts) {
  opts = defaultOpts(opts)

  var lines = wrapLines(text, opts)
  return lines.join(opts.eol)
}

function wrapLines (text, opts) {
  var words = text.match(/(\S+|\r\n?|\n)/g) || []

  var lineLength = 0
  var lines = []
  var line = ''

  if (opts.break) {
    var broken = []
    forEach(words, function (word) {
      if (word.length > opts.width) {
        var letters = word.split('')
        var section

        while ((section = letters.splice(0, opts.width)).length) {
          broken.push(section.join(''))
        }
      } else {
        broken.push(word)
      }
    })

    words = broken
  }

  forEach(words, function (word) {
    if (/^(\r\n?|\n)$/.test(word)) {
      lines.push(line || '')
      line = ''
      lineLength = 0
    } else {
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
  opts.broken = opts.broken || false
  opts.indent = opts.indent || ''
  opts.eol = opts.eol || '\n'
  return opts
}

module.exports = wrap
