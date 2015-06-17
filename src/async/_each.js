var eachOf = require('./eachOf')
var eachOfSeries = require('./eachOfSeries')
var _withoutIndex = require('../utils/asyncWithoutIndex')

function each (arr, iterator, callback) {
  return eachOf(arr, _withoutIndex(iterator), callback)
}

function eachSeries (arr, iterator, callback) {
  return eachOfSeries(arr, _withoutIndex(iterator), callback)
}

exports.each = each
exports.eachSeries = eachSeries
