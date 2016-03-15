// Copyright (c) 2015 Lloyd Brookes <75pound@gmail.com> (MIT)
// https://github.com/75lb/array-tools

// Deep query an array

var convert = require('./convert')
var filter  = require('./filter')
var testval = require('../lang/testval')

function where (arr, query) {
  return filter(convert(arr), filterd(query))
}

function filterd (query) {
  return function (element) {
    return testval(element, query)
  }
}

module.exports = where
