var kindOf = require('./kindOf')
var isFiniteNumber = require('./isFinite')

function toArray (value) {
  var ret = []
  var kind = kindOf(value)
  var n

  if (value !== null && value !== undefined) {
    if (value.length === null || kind === 'string' || kind === 'function' || kind === 'regExp' || isFinite(value)) {
      ret[ret.length] = value
    } else {
      n = value.length
      while (n--) {
        ret[n] = value[n]
      }
    }
  }
  return ret
}

module.exports = toArray
