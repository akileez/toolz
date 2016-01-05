var forIn = require('./forIn')

function keysIn (obj) {
  var keys = []

  forIn(obj, function (val, key, obj) {
    keys.push(key)
  })

  return keys
}

module.exports = keysIn
