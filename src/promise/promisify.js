'use strict'

module.exports = function promisify (fn) {
  return function promisified (...args) {
    return new Promise((resolve, reject) =>
      fn(...args, (err, val) => (err ? reject(err) : resolve(val)))
    )
  }
}
