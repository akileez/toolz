var extend = require('./extend')

function omit (obj, toOmit) {
  toOmit = Array.isArray(toOmit) ? toOmit : [toOmit]
  var output = extend({}, obj)

  toOmit.forEach(function (omit) {
    delete output[omit]
  })
  return output
}

module.exports = omit
