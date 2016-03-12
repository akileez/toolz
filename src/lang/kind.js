var isArrayLike = require('./isArrayLike')

function base (value) {
  // Base implementation which all other kindOf
  // functions were morphed from and compared to.
  // Does not handle arguments
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'

  if (Array.isArray(value)) return 'array'

  var type = typeof value.constructor !== 'undefined'
    ? value.constructor.name
    : Object.prototype.toString.call(value)
      .replace(/^\[object |\]$/g, '')

  if (type === 'String') return 'string'
  if (type === 'Boolean') return 'boolean'
  if (type === 'Number') return 'number'
  if (type === 'Symbol') return 'symbol'
  if (type === 'Function') return 'function'
  if (type === 'Object') return 'object'
  if (type === 'RegExp') return 'regexp'
  if (type === 'Date') return 'date'
  if (type === 'Buffer') return 'buffer'

  return type.toLowerCase()
}

function kind (value) {
  // Return the constructor name if not a primative, array or function
  // A more performant `kindOf` with cavets. Must test ES6 after upgrade.
  // Does not handle arguments.
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (Array.isArray(value)) return 'array'

  var type = typeof value

  if (type === 'string') return 'string'
  if (type === 'boolean') return 'boolean'
  if (type === 'number') return 'number'
  if (type === 'symbol') return 'symbol'
  if (type === 'function') return 'function'

  return objType(value)
}

function objs (value) {
  // a speedy version to obtain common object "types"
  // Does not handle arguments.
  if (typeof value === 'function') return 'function'
  if (Array.isArray(value)) return 'array'
  if (typeof value === 'string') return 'string'
    // safety check for kind.objs
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'

  return objType(value)
}

function safe (value) {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'

  if (Array.isArray(value)) return 'array'

  var type = typeof value

  if (type === 'string') return 'string'
  if (type === 'boolean') return 'boolean'
  if (type === 'number') return 'number'
  if (type === 'symbol') return 'symbol'
  if (type === 'function') return 'function'

  return objSafe(value)
}

function objType (value) {
  // this will pick out PlainObjects, regexps, and dates
  // quicker than a toString.call() but marginally slower
  // than the base implementation. Fails on arguments,
  // not really though --> arguments [object]

  var type = typeof value.constructor !== 'undefined'
    ? value.constructor.name
    : Object.prototype.toString.call(value)
      .replace(/^\[object |\]$/g, '')

  if (type === 'Object') return 'object'
  if (type === 'RegExp') return 'regexp'
  if (type === 'Date') return 'date'
  if (type === 'Buffer') return 'buffer'

  return type.toLowerCase()
}

function objSafe (value) {
  if (typeof value.pipe === 'function') return 'stream'
  // Object.create(null) throws an error. Code below
  // prevents this from happening. Handles arguments.
  var type = typeof value.constructor !== 'undefined'
    ? value.constructor.name
    : Object.prototype.toString.call(value)
      .replace(/^\[object |\]$/g, '')

  if (type === 'Object') {
    return isArrayLike(value)
      ? 'arguments'
      : 'object'
  }

  if (type === 'RegExp') return 'regexp'
  if (type === 'Date') return 'date'
  if (type === 'Buffer') return 'buffer'

  return type.toLowerCase()
}

function kindOf (value) {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (Array.isArray(value)) return 'array'

  return typeof value === 'object'
    ? Object.prototype.toString.call(value)
      .replace(/^\[object |\]$/g, '')
      .toLowerCase()
    : typeof value
}

module.exports = kind
module.exports.base = base
module.exports.objs = objs
module.exports.safe = safe
module.exports.Of = kindOf
