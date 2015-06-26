var baseToString = require('../base/baseToString')
var isArray = require('../lang/isArray')

// used to match property names within property paths.
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g

// used to match backslashes in property paths
var reEscapeChar = /\\(\\)?/g

// converts "value" to property path array if it's not one

function toPath (value) {
  if (isArray(value)) return value

  var result = []
  baseToString(value).replace(rePropName, function (match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match))
  })
  return result
}

module.exports = toPath
