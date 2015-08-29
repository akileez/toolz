var forIn = require('./forIn')

// return a list of all enummerable properties that have function values

function functions (obj) {
  var keys = []
  forIn(obj, function (value, key) {
    if (typeof value === 'function') keys.push(key)
  })
  return keys.sort()
}

module.exports = functions
