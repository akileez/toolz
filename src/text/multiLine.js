// adopted from: multiline <https://github.com/sindresorhus/multiline>
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com) (MIT)

var stripIndent = require('./indentStrip')
var isFunction = require('../lang/isFunction')
var assert = require('assert')

// start matching after:
//   comment start block => ! or @preserve => optional whitespace => newline
// stop matching before:
//   last newline => optional whitespace => comment end block
var reContents = /\/\*!?(?:\@preserve)?[ \t]*(?:\r\n|\n)([\s\S]*?)(?:\r\n|\n)[ \t]*\*\//

function multiLine (fn) {
  assert(isFunction(fn), 'Expected a function')
  var match = reContents.exec(fn.toString())
  assert(match, 'multiLine comment missing')
  return match[1]
}

function strip (fn) {
  return stripIndent(multiLine(fn))
}

module.exports = multiLine
module.exports.strip = strip
