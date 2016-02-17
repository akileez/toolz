var asyncReduce = require('./itera-reduce')

function asyncFilter (obj, iterator, done) {
  function filterIterator (acc, val, key, next) {
    iterator(val, key, (err, res) => {
      if (res) acc.push(obj[key])
      next(err, acc)
    })
  }

  asyncReduce(obj, [], filterIterator, done)
}

module.exports = asyncFilter
