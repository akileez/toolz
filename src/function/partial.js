var slice = require('../array/slice')
var indexOf = require('../array/indexOf')
var take = require('../array/take')

/*
  creates a partially applied function
  Original code:
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
*/

var _ = {}

function partial (f) {
  var as = slice(arguments, 1)
  var has_ = indexOf(as, _) !== -1

  return function () {
    var rest = slice(arguments)

    // Don't wast time checking for placeholders
    // if there aren't any.

    var args = has_ ? take(as.length, function (i) {
      var a = as[i]
      return a === _ ? rest.shift() : a
    }) : as

    return f.apply(this, rest.length ? args.concat(rest) : args)
  }
}

partial._ = _

module.exports = partial
