// is-arrow-function <https://github.com/ljharb/is-arrow-function>
// Copyright (c) 2013 Jordan Harband (MIT)

var isCallable = require('./is-callable')

'use strict'

var fnToStr = Function.prototype.toString
var isNonArrowFnRegex = /^\s*function/
var isArrowFnWithParensRegex = /^\([^\)]*\) *=>/
var isArrowFnWithoutParensRegex = /^[^=]*=>/

module.exports = function isArrowFunction (fn) {
  if (!isCallable(fn)) return false
  var fnStr = fnToStr.call(fn)

  return fnStr.length > 0
    && !isNonArrowFnRegex.test(fnStr)
    && (isArrowFnWithParensRegex.test(fnStr) || isArrowFnWithoutParensRegex.test(fnStr))
}
