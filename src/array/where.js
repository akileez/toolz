// Copyright (c) 2015 Lloyd Brookes <75pound@gmail.com> (MIT)
// https://github.com/75lb/array-tools

// Deep query an array

var toArray = require('../lang/toArray')
var testval = require('../lang/testval')
var filter  = require('./filter')

function where (arr, query) {
  arr = toArray(arr)

  return filter(arr, function (item) {
    return testval(item, query)
  })
}

module.exports = where
