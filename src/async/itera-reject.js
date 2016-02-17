var asyncReduce = require('./itera-reduce')

function asyncReject (obj, iterator, done) {
  function rejectIterator (acc, val, key, next) {
    iterator(val, key, (err, res) => {
      if (!res) acc.push(obj[key])
      next(err, acc)
    })
  }

  asyncReduce(obj, [], rejectIterator, done)
}

module.exports = asyncReject
