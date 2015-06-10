var eachOfSeries = require('./eachOfSeries')
var _withoutIndex = require('../base/_withoutIndex')

function eachSeries (arr, iterator, callback) {
  return eachOfSeries(arr, _withoutIndex(iterator), callback)
}

module.exports = eachSeries
