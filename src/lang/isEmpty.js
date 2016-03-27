var forOwn = require('../object/forOwn')

function isEmpty (value) {
  if (value == null) return true
  var kind = typeof value

  if (kind === 'boolean') return false
  if (kind === 'number') return value === 0

  if (kind === 'string'
    || kind === 'function'
    || Array.isArray(value)
  ) return !value.length

  var result = true

  forOwn(value, function () {
    result = false
    return result
  })

  return result
}

module.exports = isEmpty
