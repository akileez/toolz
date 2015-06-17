var _baseSlice = require('../utils/asyncBaseSlice')

function apply (fn) {
  var args = _baseSlice(arguments, 1)
  return function () {
    return fn.apply(null, args.concat(_baseSlice(arguments)))
  }
}

module.exports = apply
