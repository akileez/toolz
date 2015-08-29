var kindOf = require('./kindOf')
var GLOBAL = require('./GLOBAL')

// convert array-like object into array

function toArray (value) {
  var ret = []
  var kind = kindOf(value)
  var n

  if (value != null) {
    if (value.length == null
      || kind === 'string'
      || kind === 'function'
      || kind === 'regexp'
      || value === GLOBAL
      ) {
      // string, regexp, function have .length but user probably just want
      // to wrap value into array..
      ret[ret.length] = value
    } else {
      // window returns true on isObject in IE7 and may have length
      // property. `typeof NodeList` returns function on Safari so
      // we can't use it (#58)
      n = value.length
      while (n--) {
        ret[n] = value[n]
      }
    }
  }
  return ret
}

module.exports = toArray
