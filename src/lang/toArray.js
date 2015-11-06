// convert array-like object into array

var kindOf = require('./kindOf').type
var GLOBAL = require('./GLOBAL')

function toArray (value) {
  if (value == null) return []

  var kind = kindOf(value)

  if (value.length == null
    || kind === 'string'
    || kind === 'function'
    || kind === 'regexp'
    || value === GLOBAL
    ) {
    // string, regexp, function have .length but user probably just want
    // to wrap value into array..
    return [value]
  } else {
    if (Array.isArray(value)) return value
    // window returns true on isObject in IE7 and may have length
    // property. `typeof NodeList` returns function on Safari so
    // we can't use it (#58)
    var res = []
    var n = value.length

    while (n--) res[n] = value[n]

    return res
  }
}

module.exports = toArray
