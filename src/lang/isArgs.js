// from <https://github.com/ljharb/object-keys>
// Copyright (C) 2013 Jordan Harband (MIT)

'use strict'

var toStr = Object.prototype.toString

function isArguments (value) {
  var str = toStr.call(value)
  var isArgs = str === '[object Arguments]'

  if (!isArgs) {
    isArgs = str !== '[object Array]'
      && value !== null
      && typeof value === 'object'
      && typeof value.length === 'number'
      && value.length >= 0
      && toStr.call(value.callee) === '[object Function]'
  }

  return isArgs
}

module.exports = isArguments
