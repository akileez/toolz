var isArray = require('../lang/isArray')
var append = require('./append')

function flattenTo (arr, result, level) {
  if (arr == null) return result
  else if (level === 0) {
    append(result, arr)
    return result
  }
  var value
  var i = -1
  var len = arr.length
  while (++i < len) {
    value = arr[i]
    if (isArray(value)) flattenTo(value, result, level - 1)
    else result.push(value)
  }
  return result
}

function flatten (arr, level) {
  level = level == null ? -1 : level
  return flattenTo(arr, [], level)
}

module.exports = flatten
