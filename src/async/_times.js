var map = require('./_Map')
var mapSeries = require('./_Map').Series
var _range = require('../utils/asyncRange')

function _times (mapper) {
  return function (count, iterator, callback) {
    mapper(_range(count), iterator, callback)
  }
}

var times = _times(map)
var timesSeries = _times(mapSeries)

module.exports = times
module.exports.Series = timesSeries