var extend  = require('./extend')
var slice   = require('../array/sliced')
var forEach = require('../array/forEach')

function omit (obj, toOmit) {
  toOmit = Array.isArray(toOmit)
    ? toOmit
    : slice(arguments, 1)

  var output = extend({}, obj)

  forEach(toOmit, function (omit) {
    delete output[omit]
  })
  return output
}

module.exports = omit
