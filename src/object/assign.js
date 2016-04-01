'use strict'

var isPropEnumerable = require('./is-prop-enumerable')
var hasSymbols       = require('./has-symbols')
var forOwn           = require('./forOwn')
var toObject         = require('../lang/toObject')

// pure function now. Object.assign is in node and therefore
// I will use directly. Otherwise this. Differs from object/extend
// and object/xtend in that assign will handle smybols.

function assign (target, source) {
  var from
  var to = toObject(target)
  var symbols
  var s = 0
  var alen = arguments.length

  while (++s < alen) {
    from = Object(arguments[s])

    forOwn(from, (val, key) => {
      to[key] = from[key]
    })

    if (hasSymbols(from)) {
      symbols = Object.getOwnPropertySymbols(from)
      var i = -1
      var slen = symbols.length

      while (++i < slen) {
        if (isPropEnumerable(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]]
        }
      }
    }
  }

  return to
}

module.exports = assign
