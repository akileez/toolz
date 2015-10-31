var forEach = require('../array/forEach')
var slice = require('../array/slice')
var forOwn = require('./forOwn')

// copy missing properties in the obj from the defaults

function fillIn (obj, var_defaults) {
  forEach(slice(arguments, 1), function (base) {
    forOwn(base, function (value, key) {
      if (obj[key] == null) obj[key] = value
    })
  })
  return obj
}

module.exports = fillIn
