// Adopted from:
// Copyright (c) 2015 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk) (MIT)
// make-callback <https://github.com/tunnckoCore/make-callback>

'use strict'

var isSyncFn = require('./isSyncFn')
var handleArgs = require('./handleArgs')

function makeCallback (fn) {
  if (!isSyncFn(fn))
    throw new TypeError('makeCallback expects a sync function')

  return function () {
    var argz = handleArgs(arguments)

    if (!argz.callback)
      throw new TypeError('async `fn` expects a callback')

    var res = false
    try {
      res = fn.apply(fn, argz.args)
    } catch (err) {
      return argz.callback(err)
    }

    function handle (result) {
      if (result.done) return result.value

      try {
        return handle(res.next(result.value))
      } catch (err) {
        return argz.callback(err)
      }
    }

    res = handle(res.next())

    return res ? argz.callback(null, res) : null
  }
}

module.exports = makeCallback
