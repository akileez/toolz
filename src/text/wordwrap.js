// adopted from: wordwrapjs <https://github.com/75lb/wordwrapjs>
// Copyright (c) 2015 Lloyd Brookes <75pound@gmail.com> (MIT)

// differs from orginal by:
// adding indent option,
// declaring a wrapLines function as opposed to variable assignment,
// removing option settings inside wrapLines function,
// removing os.EOL setting (using a string),
// no input text validation,

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

var re = {
  nonWhitespaceCharsOrNewLine:  /[^\s-]+?-\b|\S+|\r\n?|\n/g,
  singleNewLine: /^(\r\n?|\n)$/
}

function wrap (text, opts) {
  opts = defaultOpts(opts)

  var lines = wrapLines(text, opts)
  return lines.join(opts.eol)
}

// returns the wrapped output as an array of lines, rather than a single string
function wrapLines (text, opts) {
  opts = opts || defaultOpts(opts)

  var words = getWords(text)

  var lineLength = 0
  var lines = []
  var line = ''

  if (opts.break) {
    var broken = []
    forEach(words, function (word) {
      var wordLength = opts.ignore
        ? replaceIgnored(word, opts.ignore).length
        : word.length

      if (wordLength > opts.width) {
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

  // for each word, either extend the current `line` or create a new one
  forEach(words, function (word) {
    if (re.singleNewLine.test(word)) {
      lines.push(line ? opts.indent + line : '')
      line = ''
      lineLength = 0
    } else {
      var wordLength = opts.ignore
        ? replaceIgnored(word, opts.ignore).length
        : word.length

      var offset
      if (lineLength > options.width) {
        offset = 0
      } else {
        if (/-$/.test(line)) {
          offset = 0
        } else {
          offset = line ? 1 : 0
        }
      }

      lineLength += wordLength + offset

      if (lineLength > opts.width) {
        // Can't fit word on line, cache line and create new one
        if (line) lines.push(opts.indent + line)
        line = word
        lineLength = wordLength
      } else {
        if (/-$/.test(line)) line = word
        else line += (line ? ' ' : '') + word
      }
    }
  })

  if (line) lines.push(opts.indent + line)

  return lines
}

// splits the input text returning an array of words
function getWords (text) {
  return text.match(re.nonWhitespaceCharsOrNewLine) || []
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
  opts.break = opts.break || false
  opts.indent = opts.indent || ''
  opts.eol = opts.eol || '\n'
  return opts
}

module.exports = wrap
module.exports.lines = wrapLines
module.exports.getWords = getWords
