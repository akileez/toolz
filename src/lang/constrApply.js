var apply = require('../function/apply')
var slice = require('../array/slice')

function F () {}

function constrApply (constr, args) {
  args = Array.isArray(args) ? args : slice(arguments, 1)
  F.prototype = constr.prototype
  var instance = new F()
  apply(constr, instance, args)
  return instance
}

module.exports = constrApply
