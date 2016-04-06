// adopted from: trim-right <sindresorhus/trim-right>
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com) (MIT)
// Similar to String#trim() but removes only whitespace on the right

var contains = require('../regex/contains')

function trimRight (str) {
  var tail = str.length
  var re = /[\s\uFEFF\u00A0]/

  while (contains(re, str[tail - 1])) {
    tail--
  }

  return str.slice(0, tail)
}

module.exports = trimRight