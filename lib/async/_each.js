var eachOf = require('./eachOf')
var eachOfLimit = require('./eachOfLimit')
var eachOfSeries = require('./eachOfSeries')
var _withoutIndex = require('../utils/asyncWithoutIndex')

function each (arr, iterator, callback) {
  return eachOf(arr, _withoutIndex(iterator), callback)
}

function eachSeries (arr, iterator, callback) {
  return eachOfSeries(arr, _withoutIndex(iterator), callback)
}

function eachLimit (arr, limit, iterator, callback) {
  return eachOfLimit(limit)(arr, _withoutIndex(iterator), callback)
}

exports.each = each
exports.eachSeries = eachSeries
exports.eachLimit = eachLimit
