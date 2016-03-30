var forOwn = require('./forOwn')

function reject (obj, fn) {
  var result = {}

  forOwn(obj, function (val, key) {
    if (!fn(obj[key], key, obj)) result[key] = obj[key]
  })

  return result
}

module.exports = reject
