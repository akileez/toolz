var isArray = require('./isArray')
var forOwn = require('../object/forOwn')

function isEmpty (value) {
  if (value == null) return true
  else if (typeof value === 'string' || isArray(value)) return !value.length
  else if (typeof value === 'object') {
    var result = true
    forOwn(value, function () {
      result = false
      return false
    })
    return result
  } else {
    return true
  }
}

module.exports = isEmpty
