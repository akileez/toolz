// Copyright (c) 2014-2015, Jon Schlinkert (MIT)
// https://github.com/jonschlinkert/delimiter-regex

var extend = require('../object/extend')

function delimiters (open, close, options) {
  if (open instanceof RegExp) return open
  if (typeof close !== 'string') {
    options = close
    close = null
  }

  if (typeof open === 'object' && !Array.isArray(open)) {
    options = open
    open = null
    close = null
  }

  if (Array.isArray(open)) {
    var syntax = open.slice()
    open = syntax[0]
    close = syntax[1]
  }

  var opts = extend({flags: ''}, options)
  var body = '([\\s\\S]+?)'

  open = open || '\\${'
  close = close || '}'

  return new RegExp(open + body + close, opts.flags)
}

module.exports = delimiters
