var hasOwn = require('./hasOwn')

// get object size

function size (obj) {
  var count = 0
  var key

  for (key in obj) {
    if (hasOwn(obj, key)) count++
  }

  return count
}

module.exports = size
