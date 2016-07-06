/**
  https://github.com/jonpacker/destroy-circular
  Copyright (c) 2014 Freeform Systems (MIT)

  Replace circular references in an object with a string

  Creates a copy of an object where all of the circular references are replaced by a string [Circular]. Useful for protecting against problems when stringifying an object when you don't have control over the stringifying.

  Usage:
    var dc = require('destroy-circular')

    var obj = {}
    var child = {parent: obj}
    obj.child = child

    var stringifySafeObj = dc(obj)
    console.log(stringifySafeObj)
    // -> { child: { parent: '[Circular]' } }

*/

var forEach = require('../object/foreach')

function circular (obj) {
  function copy (from, seen) {
    var to = Array.isArray(from) ? [] : {}
    seen.push(from)

    forEach(from, (val, key) => {
      if (!val || (typeof val != 'object'
        && !Array.isArray(val)
      ))
        to[key] = val

      else if (seen.indexOf(val) == -1) {
        to[key] = copy(val, seen.slice(0))
      }

      else to[key] = '[Circular]'
    })

    return to
  }

  return copy(obj, [])
}

module.exports = circular
