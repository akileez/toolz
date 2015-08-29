function F () {}

function constrApply (constr, args) {
  F.prototype = constr.prototype
  var instance = new F()
  constr.apply(instance, args)
  return instance
}

module.exports = constrApply
