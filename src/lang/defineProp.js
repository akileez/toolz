var isDescriptor = require('./isDescriptor')

// This method allows precise addition to or modification of a property on an object.

// Normal property addition through assignment creates properties which show up during property enumeration (for...in loop or Object.keys method), whose values may be changed, and which may be deleted. This method allows these extra details to be changed from their defaults.

// By default, values added using Object.defineProperty() are immutable.

// Property descriptors present in objects come in two main flavors: data descriptors and accessor descriptors. A descriptor must be one of these two flavors; it cannot be both.
// Both data and accessor descriptors are objects.

// They share the following required keys: configurable, enumerable

// A data descriptor is a property that has a value, which may or may not be writable.

// An accessor descriptor is a property described by a getter-setter pair of functions.

// This is extrememly raw.
// obj: object to be mutated
// prop: property to add.
// config: boolean for configurable key or descriptor object
// enumerable: boolean for enumerable key
// a: boolean if data-descriptor (alias for writable key), function if accessor-descriptor (alias for getter function)
// b: a javascript value if data-descriptor (alias for value), function if accessor-descriptor (alias for setter function)

function defineProperty (obj, prop, config, enumerable, a, b) {
  if (typeof config === 'boolean') {
    // defining an accessor descriptor
    if (typeof a === 'function') {
      return Object.defineProperty(obj, prop, {
        configurable: config || false,
        enumerable: enumerable || false,
        get: a,
        set: b
      })
    } else {
      // defining a data descriptor
      return Object.defineProperty(obj, prop, {
        configurable: config || false,
        enumerable: enumerable || false,
        writable: a || false,
        value: b
      })
    }
  } else if (isDescriptor(config)) {
    return Object.defineProperty(obj, prop, config)
  }
}

module.exports = defineProperty
