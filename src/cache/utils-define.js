var stampit  = require('../object/stamp')
var define   = require('../object/defineProp')

module.exports = stampit()
  .methods({
    xtend: definition
  })

function definition (prop, val, com, enu, wrt) {
  var that = this

  define(that, prop, {
    composable: !!com,
    enumerable: !!enu,
    writable: !!wrt,
    value: val
  })
}

