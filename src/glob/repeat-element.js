// repeat-element <https://github.com/jonschlinkert/repeat-element>
// Copyright (c) 2015 Jon Schlinkert. (MIT)

'use strict'

function repeat (ele, num) {
  var arr = new Array(num)

  for (var i = 0; i < num; i++) {
    arr[i] = ele
  }

  return arr
}

module.exports = repeat
