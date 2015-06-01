var forOwn = require('./forOwn')

var keys = Object.keys || function (obj) {
  var keys = []
  forOwn(obj, function (value, key) {
    keys.push(key)
  })
  return keys
}

module.exports = keys
