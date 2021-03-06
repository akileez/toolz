var slice = require('../array/slice')

// return a copy of the object, filtered to only
// have values for the whitelisted keys

function pick (obj, var_keys) {
  var keys = typeof arguments[1] !== 'string'
    ? arguments[1]
    : slice(arguments, 1)

  var result = {}
  var i = 0
  var key

  while ((key = keys[i++])) {
    result[key] = obj[key]
  }
  return result
}

module.exports = pick
