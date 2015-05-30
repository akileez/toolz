var toArray = require('../lang/toArray')
var clone   = require('../lang/clone')

function omit (obj, toOmit) {
  toOmit = toArray(toOmit)
  var output = clone(obj)
  toOmit.forEach(function (omit) {
    delete output[omit]
  })
  return output
}

module.exports = omit
