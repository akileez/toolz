var eachOfLimit = require('./eachOfLimit')

function iterateLimit (fn) {
  return function (obj, limit, iterator, callback) {
    return fn(eachOfLimit(limit), obj, iterator, callback)
  }
}