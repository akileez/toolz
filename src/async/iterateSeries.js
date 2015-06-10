var eachOfSeries = require('./eachOfSeries')

function iterateSeries (fn) {
  return function (obj, iterator, callback) {
    return fn(eachOfSeries, obj, iterator, callback)
  }
}

module.exports = iterateSeries
