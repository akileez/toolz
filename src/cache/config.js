var stampit  = require('../object/stamp')
var set      = require('../object/set')
var get      = require('../object/get')
var visit    = require('../object/visit')
var slice    = require('../array/slice')
var isOr     = require('../lang/yoda').or
var kindOf   = require('../lang/kindOf')

module.exports = stampit()
  .methods({
    option: option,
    enable: enable,
    disable: disable
  })
  .initializers([
    function () {
      this.config = {}
    }
  ])

function option (key, val) {
  if (arguments.length === 1 && kindOf(key) === 'string') {
    if (key.indexOf('.') === -1) return this.config[key]

    return get(this.config, key)
  }

  if (isOr(kindOf(key), 'object', 'array')) {
    return visit(this, 'option', slice(arguments))
  }

  set(this.config, key, val)
  if (this.emit) this.emit('option', key, val)
  return this
}

function enable (key) {
  return this.option(key, true)
}

function disable (key) {
  this.option(key, false)
}

