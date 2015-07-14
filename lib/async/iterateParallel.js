var eachOf = require('./eachOf')

function iterateParallel (fn) {
  return function (obj, iterator, callback) {
    return fn(eachOf, obj, iterator, callback)
  }
}

module.exports = iterateParallel