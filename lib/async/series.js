var noop = require('../base/noop')
var isArrayLike = require('../lang/isArrayLike')
var eachOfSeries = require('./eachOfSeries')
var _baseSlice = require('../utils/asyncBaseSlice')

function series (tasks, callback) {
  callback = callback || noop
  var results = isArrayLike(tasks) ? [] : {}

  eachOfSeries(tasks, function (task, key, callback) {
    task(function (err) {
      var args = _baseSlice(arguments, 1)
      if (args.length <= 1) args = args[0]

      results[key] = args
      callback(err)
    })
  }, function (err) {
    callback(err, results)
  })
}

module.exports = series
