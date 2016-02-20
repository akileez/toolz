var asyncReduce = require('./itera-reduce')

function asyncTimes (num, iterator, done) {
  var obj = Array(num)
  function timesIterator (acc, val, key, next) {
    iterator(num, (err, res) => {
      acc.push(res)
      next(err, acc)
    })
  }

  asyncReduce(obj, [], timesIterator, done)
}

module.exports = asyncTimes
