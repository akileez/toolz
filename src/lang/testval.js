// adopted from: test-value <https://github.com/75lb/test-value>
// Copyright (c) 2015 Lloyd Brookes <75pound@gmail.com> (MIT)

var toArray       = require('./toArray')
var isObject      = require('./isObjectLike')
var isPlainObject = require('./isPlainObject')
var every         = require('../array/every')
var some          = require('../array/some')
var keys          = require('../object/keys')

function testValue (val, test) {
  if (isPlainObject(test) && isObject(val)) {
    return every(keys(test), function (prop) {
      var queryValue = test[prop]

      var isNegated = false
      var isContains = false

      // get flags
      if (prop.charAt(0) === '!') isNegated = true
      else if (prop.charAt(0) === '+') isContains = true

      // strip flag char
      prop = (isNegated || isContains) ? prop.slice(1) : prop
      var objectValue = val[prop]

      if (isContains) {
        queryValue  = toArray(queryValue)
        objectValue = toArray(objectValue)
      }

      var result = testValue(objectValue, queryValue)

      return isNegated ? !result : result
    })
  }

  if (Array.isArray(test)) {
    var tests = test
    if (!Array.isArray(val)) val = [val]

    return some(val, function (value) {
      return some(tests, function (test) {
        return testValue(value, test)
      })
    })
  }

  if (test instanceof RegExp) {
    // regexes queries will always return `false` for `null`, `undefined`, `NaN`.
    // This is to prevent a query like `/.+/` matching the string `undefined`.
    if (['boolean', 'string', 'number'].indexOf(typeof val) === -1) return false
    else return test.test(val)
  }

  if (typeof test === 'function') {
    return test(val)
  }

  return test === val
}

module.exports = testValue
