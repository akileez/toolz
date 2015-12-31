var map                  = require('../object/map')
var omit                 = require('../object/omit')
var extend               = require('../object/extend')
var hasOwn               = require('../object/hasOwn')
var isFunction           = require('./isFunction')
var isPlainObject        = require('./isPlainObject')
var isDataDescriptor     = require('./isDescriptorData')
var isAccessorDescriptor = require('./isDescriptorAccessor')

// This method allows precise addition to or modification of a property on an object.

// Normal property addition through assignment creates properties which show up during property enumeration (for...in loop or Object.keys method), whose values may be changed, and which may be deleted. This method allows these extra details to be changed from their defaults.

// By default, values added using Object.defineProperty() are immutable.

// Property descriptors present in objects come in two main flavors: data descriptors and accessor descriptors. A descriptor must be one of these two flavors; it cannot be both.
// Both data and accessor descriptors are objects.

// They share the following required keys: configurable, enumerable

// A data descriptor is a property that has a value, which may or may not be writable.

// An accessor descriptor is a property described by a getter-setter pair of functions.

// This is extrememly raw.
// obj: [object] object to be mutated
// prop: [String] property to add.
// config: [Boolean|Object] boolean for configurable key or descriptor object
// enumerable: [Boolean] boolean for enumerable key
// a: [Boolean|Function] boolean if data-descriptor (alias for writable key), function if accessor-descriptor (alias for getter function)
// b: [AnyValue|Function] a javascript value if data-descriptor (alias for value), function if accessor-descriptor (alias for setter function)

function defineProperty (obj, prop, config, enumerable, a, b) {
  // multiple definition
  if (isPlainObject(prop)) {
    return Object.defineProperties(obj, map(prop, definePropDefaults))
  }
  // implicit definition
  if (isPlainObject(config)) {
    return Object.defineProperty(obj, prop, definePropDefaults(config))
  }

  // explicit definition
  var configuration = {}
  configuration.configurable = !!config
  configuration.enumerable = !!enumerable

  if (isFunction(a)) {
    configuration.get = a
    configuration.set = b
  } else {
    configuration.writable = !!a
    configuration.value = b
  }

  return Object.defineProperty(obj, prop, configuration)
}

function definePropDefaults (obj) {
  var options = {
    configurable: true,
    enumerable: true,
    writable: false,
    value: undefined,
    get: undefined,
    set: undefined
  }

  if (isDataDescriptor(obj) || hasOwn(obj, 'value')) {
    return extend({}, omit(options, ['get', 'set']), obj)
  }

  if (isAccessorDescriptor(obj) || hasOwn(obj, 'get')) {
    return extend({}, omit(options, ['writable', 'value']), obj)
  }
}

module.exports = defineProperty
