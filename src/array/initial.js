var slice = require('./slice')

function initial (arr) {
  return slice(arr, 0, -1)
}

module.exports = initial
