'use strict'

var hasSymbols = require('./has-symbols')
var forOwn     = require('./forOwn')
var toObject   = require('../lang/toObject')

var propIsEnumerable = Object.prototype.propertyIsEnumerable

// pure function now. Object.assign is in node and therefore
// I will use directly. Otherwise this. Differs from object/extend
// in that this will handle smybols.

module.exports = function (target, source) {
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
      symbols = hasSymbols(from)
      var i = -1
      var slen = symbols.length

      while (++i < slen) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]]
        }
      }
    }
  }

  return to
}
