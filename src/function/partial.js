var slice = require('../array/slice')

function partial (f) {
  var as = slice(arguments, 1)
  return function () {
    var args = as.concat(slice(arguments))
    for (var i = args.length; i--;) {
      if (args[i] === partial._) args[i] = args.splice(-1)[0]
    }
    return f.apply(this, args)
  }
}

partial._ = {}

module.exports = partial
