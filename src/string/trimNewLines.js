// adopted from: trim-off-newlines <stevemao/trim-off-newlines>
// Copyright (c) Steve Mao <maochenyan@gmail.com> (github.com/stevemao) (MIT)
// Similar to String#trim() but removes only newlines

var replace = require('../regex/replace2')

function trimNL (str) {
  var re = /^(?:\r\n|\n|\r)+|(?:\r\n|\n|\r)+$/g

  return replace(str, re, '')
}

module.exports = trimNL
