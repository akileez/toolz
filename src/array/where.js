// Copyright (c) 2015 Lloyd Brookes <75pound@gmail.com> (MIT)
// https://github.com/75lb/array-tools

var toArray = require('../lang/toArray')
var testval = require('../lang/testval')

function where (arr, query) {
  arr = toArray(arr)
  return arr.filter(function (item) {
    return testval(item, query)
  })
}

module.exports = where
