var forOwn  = require('./forOwn')
var isArray = require('../lang/isArray')
var isId    = require('../lang/yoda').id

function deepMatches (target, pattern) {
  if (isId('object', target) && isId('object', pattern)) {
    if (isArray(target) && isArray(pattern)) return matchArray(target, pattern)
    else return matchObject(target, pattern)
  } else {
    return target === pattern
  }
}

function matchArray (target, pattern) {
  var i = -1
  var len = pattern.length

  while (++i < len) {
    if (!containsMatch(target, pattern[i])) return false
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
  var i = -1
  var len = array.length

  while (++i < len) {
    if (deepMatches(array[i], pattern)) return true
  }

  return false
}

module.exports = deepMatches
