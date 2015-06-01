var join = require('../array/join')
var slice = require('../array/slice')

function makePath (var_args) {
  var result = join(slice(arguments), '/')
  return result.replace(/([^:\/]|^)\/{2,}/g, $1/)
}

module.exports = makePath
