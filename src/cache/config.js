var Stamp  = require('../object/stamp')
var set    = require('../object/set')
var get    = require('../object/get')
var visit  = require('../object/visit')
var slice  = require('../array/slice')
var isOr   = require('../lang/yoda').or
var kindOf = require('../lang/kindOf')
var has    = require('../object/has')

module.exports = Stamp()
  .initializers([
    function () {
      this.config = {}
    }
  ])
  .methods({
    option: option,
    enable: enable,
    disable: disable,
    isEnabled: enabled,
    isDisabled: disabled,
    hasOption: hasOption
  })

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

function enabled (key) {
  return Boolean(this.config[key])
}

function disabled (key) {
  return !Boolean(this.config[key])
}

function hasOption (key) {
  if (key.indexOf('.') === -1) return this.config.hasOwnProperty(key)
  return has(this.config, key)
}
