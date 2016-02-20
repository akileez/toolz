var asyncReduce = require('./itera-reduce')

function asyncDetect (obj, iterator, done) {
  function detectIterator (acc, val, key, next) {
    iterator(val, key, function (err, result) {
      if (result) {
        acc = obj[key]
        return done(err, acc)
      }

      next(err, acc)
    }
  }

  asyncReduce(obj, [], detectIterator, done)
}

module.exports = asyncDetect
