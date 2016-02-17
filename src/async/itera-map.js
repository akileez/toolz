var asyncReduce = require('./itera-reduce')

function asyncMap (obj, iterator, done) {
  function mapIterator (acc, val, key, next) {
    iterator(val, key, (err, res) => {
      acc.push(res)
      next(err, acc)
    })
  }

  asyncReduce(obj, [], mapIterator, done)
}

module.exports = asyncMap
