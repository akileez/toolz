var extend = require('./extend')
var slice  = require('../array/sliced')

function omit (obj, toOmit) {
  toOmit = Array.isArray(toOmit)
    ? toOmit
    : slice(arguments, 1)

  var output = extend({}, obj)

  toOmit.forEach(function (omit) {
    delete output[omit]
  })
  return output
}

module.exports = omit
