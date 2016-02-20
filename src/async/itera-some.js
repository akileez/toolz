var asyncReduce = require('./itera-reduce')

function asyncSome (obj, iterator, done) {
  function someIterator (acc, val, key, next) {
    iterator(val, key, (err, res) => {
      if (res) acc = true
      next(err, acc)
    })
  }

  asyncReduce(obj, false, someIterator, done)
}

module.exports = asyncSome
