// adopted from: is-regex <https://github.com/ljharb/is-regex>
// Copyright (c) 2014 Jordan Harband (MIT)

'use strict'

function isRegex (value) {
  if (typeof value !== 'object') return false

  var toStr = Object.prototype.toString
  var regexClass = '[object RegExp]'
  var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol'

  return hasToStringTag
    ? tryRegexExec(value)
    : toStr.call(value) === regexClass
}

function tryRegexExec (value) {
  var regexExec = RegExp.prototype.exec

  try {
    regexExec.call(value)
    return true
  } catch (e) {
    return false
  }
}

module.exports = isRegex
