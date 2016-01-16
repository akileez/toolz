'use strict'

var noop = require('../../function/noop')
var apply = require('../../function/apply')

module.exports = function once (fn) {
  var disposed

  function disposable () {
    if (disposed) return
    disposed = true
    apply((fn || noop), null, arguments)
  }

  disposable.discard = function () { disposed = true }

  return disposable
}
