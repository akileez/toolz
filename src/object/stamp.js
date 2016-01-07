var assign      = require('./extend')
var merge       = require('./merge')
var isFunction  = require('../lang/isFunction')
var isArray     = require('../lang/isArray')
var isUndefined = require('../lang/isUndefined')
var forEach     = require('../collection/forEach')
var slice       = require('../array/slice')
var isObject    = require('./is-object')

function stamp (args) {
  var _this = this

  var args = slice(arguments)

  var descriptor = this.compose

  var instance = isObject(descriptor.methods)
    ? Object.create(descriptor.methods)
    : {}

  if (isObject(descriptor.properties)) {
    assign(instance, descriptor.properties)
  }

  if (isObject(descriptor.deepProperties)) {
    merge(instance, descriptor.deepProperties)
  }

  if (isObject(descriptor.propertyDescriptors)) {
    Object.defineProperties(instance, descriptor.propertyDescriptors)
  }

  if (isArray(descriptor.initializers)) {
    (function () {
      var options = args[0]
      forEach(descriptor.initializers, function (initializer) {
        if (isFunction(initializer)) {
          var result = initializer.call(instance, options, {instance: instance, stamp: _this.stamp, args: args})
          if (!isUndefined(result)) instance = result
        }
      })
    })()
  }

  return instance
}

module.exports = stamp
