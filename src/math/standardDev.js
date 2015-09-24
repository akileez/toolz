// adopted from: array-std <https://github.com/doowb/array-std>
// Copyright (c) 2015, Brian Woodward (MIT)

var mean  = require('./mean')
var map   = require('../array/map')
var scrub = require('./scrub')

function standardDev (arr) {
  arr = scrub(arr)

  var average = mean(arr)
  var squares = map(arr, function (item) {
    return Math.pow((item - average), 2)
  })

  return Math.sqrt(mean(squares))
}

module.exports = standardDev
