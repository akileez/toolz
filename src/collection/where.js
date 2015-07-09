// Copyright (c) 2015 Lloyd Brookes <75pound@gmail.com> (MIT)
// https://github.com/75lb/array-tools

var toArray = require('../lang/toArray')
var isPlainObject = require('../lang/isPlainObject')
var matches = require('../object/matches')

function where (arr, query) {
  arr = toArray(arr)
  return arr.filter(function (item) {
    return testValue(item, query)
  })
}

function testValue (value, test) {
  if (isPlainObject(test)) return matches(value, test)
  else if (Array.isArray(test)) {
    var tests = test
    return tests.some(function (test) {
      return testValue(value, test)
    })
  } else if (test instanceof RegExp) return test.test(value)
  else if (typeof test === 'function') return test(value)
  else return test === value
}

module.exports = where
