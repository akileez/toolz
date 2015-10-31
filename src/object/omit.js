var extend  = require('../object/extend')
var slice   = require('../array/slice')

function omit (obj, toOmit) {
  toOmit = Array.isArray(toOmit)
    ? toOmit
    : slice(arguments, 1)

  var output = extend({}, obj)
  var i = -1
  var len = toOmit.length

  while (++i < len) {
    delete output[toOmit[i]]
  }

  return output
}

module.exports = omit
