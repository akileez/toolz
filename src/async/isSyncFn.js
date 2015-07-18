'use strict'

var isAsyncFn = require('./isAsyncFn')

function isSyncFn (fn) {
  return !isAsyncFn(fn)
}

module.exports = isSyncFn
