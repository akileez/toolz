var asyncReduce = require('./itera-reduce')

function asyncConcat (obj, iterator, done) {
  function concatIterator (acc, val, key, next) {
    iterator(val, key, (err, res) => {
      acc = acc.concat(res || [])
      next(err, acc)
    })
  }

  asyncReduce(obj, [], concatIterator, done)
}

module.exports = asyncConcat
