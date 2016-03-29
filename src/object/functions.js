var forIn = require('./forIn')
// return a list of all enummerable properties that have function values

function functions (obj) {
  var result = []

  forIn(obj, function (val, key) {
    if (typeof val === 'function') result.push(key)
  })

  return result.sort()
}

module.exports = functions
