// Copyright (c) 2015 Lloyd Brookes <75pound@gmail.com> (MIT)
// https://github.com/75lb/array-tools

// Deep query an array

var convert = require('./convert')
var filter  = require('./filter')
var testval = require('../lang/testval')

function where (arr, query) {
  arr = convert(arr)

  return filter(arr, function (item) {
    return testval(item, query)
  })
}

module.exports = where
