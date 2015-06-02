var forOwn = require('./forOwn')

// get object size

function size (obj) {
  var count = 0
  forOwn(obj, function () {
    count++
  })
  return count
}

module.exports = size
