var stampit  = require('../object/stamp')

module.exports = stampit()
  .methods({
    isTrue: isTrue,
    isFalse: isFalse,
    isBoolean: isBoolean,
    canDisable: disableCheck,
    canEnable: enableCheck
  })

function isTrue (key) {
  return this.config[key] === true
}

function isFalse (key) {
  return this.config[key] === false
}

function isBoolean (key) {
  return typeof this.config[key] === 'boolean'
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
