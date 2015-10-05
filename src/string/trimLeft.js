// adopted from: trim-left <sindresorhus/trim-left>
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com) (MIT)
// Similar to String#trim() but removes only whitespace on the left

var replace = require('../regex/replace2')

function trimLeft (str) {
  var re = /^[\s\uFEFF\u00A0]+/

  return replace(str, re, '')
}

module.exports = trimLeft
