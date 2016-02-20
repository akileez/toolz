var asyncReduce = require('./itera-reduce')

function asyncSeries (obj, done) {
  function seriesIterator(acc, fn, next) {
    fn(function (err, res) {
      acc.push(res)
      next(err, acc)
    })
  }

  asyncReduce(obj, [], seriesIterator, done)
}

module.exports = asyncSeries
