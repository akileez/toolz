var Emitter = require('../util/Emitter')
var kindOf  = require('../lang/kindOf')
var get     = require('../object/get')
var set     = require('../object/set')
var has     = require('../object/has')
var toFlags = require('../string/toFlags')
var visit   = require('./visit')

function Options (options, obj) {
  Emitter.call(this)
  this.options = options || {}
  if (obj) mixin(obj)
}

Emitter(Options.prototype) // study node.events.EventEmitter

function mixin (obj) {
  for (var key in Options.prototype) {
    obj[key] = Options.prototype[key]
  }
}

Options.prototype.option = function (key, val) {
  if (arguments.length === 1 && kindOf(key) === 'string') {
    if (key.indexOf('.') === -1) return this.options[key]

    return get(this.options, key)
  }

  if (kindOf(key) === 'object' || kindOf(key) === 'array') {
    return this.visit('option', [].slice.call(arguments))
  }

  set(this.options, key, val)
  this.emit('option', key, val)
  return this;
}

Options.prototype.enable = function (key) {
  return this.option(key, true)
}

Options.prototype.disable = function (key) {
  return this.option(key, false)
}

Options.prototype.enabled = function (key) {
  return Boolean(this.options[key])
}

Options.prototype.disabled = function (key) {
  return !Boolean(this.options[key])
}

Options.prototype.isTrue = function (key) {
  return this.options[key] === true
}

Options.prototype.isFalse = function (key) {
  return this.options[key] === false
}

Options.prototype.isBoolean = function (key) {
  return typeof this.options[key] === 'boolean'
}

Options.prototype.hasOption = function (key) {
  if (key.indexOf('.') === -1) return this.options.hasOwnProperty(key)
  return has(this.options, key)
}

Options.prototype.flags = function (keys) {
  keys = keys || Object.keys(this.options)
  return toFlags(this.options, keys)
}

Options.prototype.visit = function (method, target) {
  visit(this, method, target)
  return this
}

module.exports = Options
