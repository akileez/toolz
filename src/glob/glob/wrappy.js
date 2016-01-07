// adopted from: https://github.com/npm/wrappy
// Copyright (c) Isaac Z. Schlueter and Contributors (ISC)

var forEach = require('../../array/forEach')
var keys    = require('../../object/keys')
var apply   = require('../../function/apply')

// Callback wrapping utility

// Returns a wrapper function that returns a wrapped callback
// The wrapper function should do some stuff, and return a
// presumably different callback function.
// This makes sure that own properties are retained, so that
// decorations and such are not lost along the way.

function wrappy (fn, cb) {
  if (fn && cb) return wrappy(fn)(cb)

  if (typeof fn !== 'function') throw new TypeError('need wrapper function')

  forEach(keys(fn), function (k) {
    wrapper[k] = fn[k]
  })

  return wrapper

  function wrapper () {
    var args = []
    var i = -1
    var len = arguments.length

    while (++i < len) {
      args[i] = arguments[i]
    }

    var ret = apply(fn, this, args)
    var cb = args[args.length - 1]
    if (typeof ret === 'function' && ret !== cb) {
      forEach(keys(cb), function (k) {
        ret[k] = cb[k]
      })
    }
    return ret
  }
}

module.exports = wrappy
