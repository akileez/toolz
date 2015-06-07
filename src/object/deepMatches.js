var forOwn = require('./forOwn')
var isArray = require('../lang/isArray')

function deepMatches (target, pattern) {
  if (target && typeof target === 'object' && pattern && typeof pattern === 'object') {
    if (isArray(target) && isArray(pattern)) return matchArray(target, pattern)
    else return matchObject(target, pattern)
  } else {
    return target === pattern
  }
}

function matchArray (target, pattern) {
  var iter = -1
  var patternLength = pattern.length
  while (++iter < patternLength) {
    if (!containsMatch(target, pattern[iter])) return false
  }
  return true
}

function matchObject (target, pattern) {
  var result = true
  forOwn(pattern, function (value, key) {
    if (!deepMatches(target[key], value)) return (result = false)
  })
  return result
}

function containsMatch (array, pattern) {
  var iter = -1
  var length = array.length
  while (++iter < length) {
    if (deepMatches(array[iter], pattern)) return true
  }
  return false
}

module.exports = deepMatches
