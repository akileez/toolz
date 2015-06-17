var isArray = require('./isArray')
var toObject = require('./toObject')

// Used to match property names within property paths.
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/
var reIsPlainProp = /^\w*$/

// checks if "value" is a property name and not a propterty path

function isKey (value, object) {
  var type = typeof value
  if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') return true
  if (isArray(value)) return false
  var result = !reIsDeepProp.test(value)
  return result || (object != null && value in toObject(object))
}

module.exports = isKey
