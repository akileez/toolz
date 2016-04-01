var hasSymbols = require('./has-symbols')
var hasOwn     = require('./hasOwn')
var toObject   = require('../lang/toObject')
var isObj      = require('./is-object')

var propIsEnumerable = Object.prototype.propertyIsEnumerable

function assignKey (to, from, key) {
  var val = from[key]

  if (val === undefined || val === null) {
    return
  }

  if (hasOwn(to, key)) {
    if (to[key] === undefined || to[key] === null) {
      throw new TypeError('Cannot convert undefined or null to object (' + key + ')')
    }
  }

  if (!hasOwn(to, key) || !isObj(val)) {
    to[key] = val
  } else {
    to[key] = assign(Object(to[key]), from[key])
  }
}

function assign (to, from) {
  if (to === from) {
    return to
  }

  from = Object(from)

  for (var key in from) {
    if (hasOwn(from, key)) {
      assignKey(to, from, key)
    }
  }

  if (hasSymbols(from)) {
    var symbols = Object.getOwnPropertySymbols(from)
    var i = -1
    var len = symbols.length

    while (++i < len) {
      if (propIsEnumerable.call(from, symbols[i])) {
        assignKey(to, from, symbols[i])
      }
    }
  }

  return to
}

module.exports = function deepAssign (target) {
  target = toObject(target)
  var s = 0
  var len = arguments.length

  while (++s < len) assign(target, arguments[s])

  return target
}
