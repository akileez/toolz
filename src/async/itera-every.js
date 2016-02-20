var asyncReduce = require('./itera-reduce')

function asyncEvery (obj, iterator, done) {
  function everyIterator (acc, val, key, next) {
    iterator(val, key, function (err, res) {
      if (!res) acc = false
      next(err, acc)
    })
  }

  asyncReduce(obj, true, rejectIterator, done)
}

module.exports = asyncEvery
