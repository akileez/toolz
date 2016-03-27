var stampit  = require('../object/stamp')
var has      = require('../object/has')

module.exports = stampit()
  .methods({
    isEnabled: enabled,
    isDisabled: disabled,
    isTrue: isTrue,
    isFalse: isFalse,
    isBoolean: isBoolean,
    hasOption: hasOption,
    canDisable: disableCheck,
    canEnable: enableCheck
  })

function enabled (key) {
  return Boolean(this.config[key])
}

function disabled (key) {
  return !Boolean(this.config[key])
}

function isTrue (key) {
  return this.config[key] === true
}

function isFalse (key) {
  return this.config[key] === false
}

function isBoolean (key) {
  return typeof this.config[key] === 'boolean'
}

function hasOption (key) {
  if (key.indexOf('.') === -1) return this.config.hasOwnProperty(key)
  return has(this.config, key)
}

function disableCheck (key) {
  if (this.hasOption(key) && this.isTrue(key)) {
    this.disable(key)
  }

  return this
}

function enableCheck (key) {
  return (this.hasOption(key) && this.isFalse(key))
    ? this.enable(key)
    : false
}
