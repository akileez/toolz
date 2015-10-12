var difference = require('./difference')
var slice = require('./slice')

function insert (arr, items) {
  var diff = difference(slice(arguments, 1), arr)

  if (diff.length) {
    Array.prototype.push.apply(arr, diff)
  }

  return arr.length
}

module.exports = insert
