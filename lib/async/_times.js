var map = require('./_map').map
var mapSeries = require('./_map').mapSeries
var _range = require('../utils/asyncRange')

function _times (mapper) {
  return function (count, iterator, callback) {
    mapper(_range(count), iterator, callback)
  }
}

exports.times = _times(map)
exports.timesSeries = _times(mapSeries)
