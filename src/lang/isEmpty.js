var isArray = require('./isArray')
var forOwn = require('../object/forOwn')

function isEmpty (value) {
  if (value == null) return true
  var kind = typeof value

  if (kind === 'boolean') return false
  if (kind === 'number') return value === 0

  if (kind === 'string'
    || kind === 'function'
    || isArray(value)
  ) return !value.length

  if (kind === 'object') {
    var result = true

    forOwn(value, function () {
      result = false
      return false
    })

    return result
  }

  return true
}

module.exports = isEmpty
