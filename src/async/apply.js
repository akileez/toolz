var rest = require('../function/rest')
var apply = require('../function/apply')

// adopted from async.apply

function apply (fn, args) {
  return rest(function (fn, args) {
    return rest(function (callArgs) {
      return apply(fn, null, args.concat(callArgs))
    })
  })
}

module.exports = apply
