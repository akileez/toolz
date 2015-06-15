var map = require('./_Map')
var mapSeries = require('./_Map').Series
var _range = require('../base/asyncRange')

function Times (mapper) {
  return function (count, iterator, callback) {
    mapper(_range(count), iterator, callback
  }
}

var times = Times(map)
var timesSeries = Times(mapSeries)

module.exports = times
module.exports.Series = timesSeries