var clone   = require('../lang/clone')
var slice   = require('../array/sliced')

function omit (obj, toOmit) {
  toOmit = Array.isArray(toOmit) ? toOmit : slice(arguments, 1)
  var output = clone(obj)
  toOmit.forEach(function (omit) {
    delete output[omit]
  })
  return output
}

module.exports = omit
