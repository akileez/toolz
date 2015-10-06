var rest = require('../function/rest')

// adopted from async.apply

function apply (fn, args) {
  return rest(function (fn, args) {
    return rest(function (callArgs) {
      return fn.apply(null, args.concat(callArgs))
    })
  })
}

module.exports = apply
