// Return the constructor name if not a primative, array or function
// A more performant `kindOf` with cavets. Must test ES6 after upgrade.

function konstrutor (value) {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'

  if (Array.isArray(value)) return 'array'

  if (typeof value === 'string') return 'string'
  if (typeof value === 'boolean') return 'boolean'
  if (typeof value === 'number') return 'number'
  if (typeof value === 'symbol') return 'symbol'
  if (typeof value === 'function') return 'function'

  // this will pick out PlainObjects, regexps, and dates
  // more quickly than a toString.call(). Fails on arguments,
  // not really though --> arguments [object]
  var type = value.constructor.name

  if (type === 'Object') return 'object'
  if (type === 'Date') return 'date'
  if (type === 'RegExp') return 'regexp'

  return type.toLowerCase()
}

function konstrutorArgs (value) {
  // handles arguments. Same as isArguments() and kindOf.
  return Object.prototype.toString.call(value) === '[object Arguments]'
    ? 'arguments'
    : Object.prototype.toString.call(value)
      .replace(/^\[object |\]$/g, '')
      .toLowerCase()
}

function konstructorObjs (value) {
  // a speedy version to obtain common object "types"
  if (typeof value === 'function') return 'function'
  if (Array.isArray(value)) return 'array'
  if (typeof value === 'string') return 'string'

  var type = value.constructor.name

  if (type === 'Object') return 'object'
  if (type === 'Date') return 'date'
  if (type === 'RegExp') return 'regexp'

  return type.toLowerCase()
}

function konstructorSafe (value) {
  // Object.create(null) throws an error. Code below
  // prevents this from happening.
  try {
    if (value === null) return 'null'
    if (value === undefined) return 'undefined'

    if (Array.isArray(value)) return 'array'

    var type = value.constructor.name

    if (type === 'String') return 'string'
    if (type === 'Boolean') return 'boolean'
    if (type === 'Number') return 'number'
    if (type === 'Symbol') return 'symbol'
    if (type === 'Function') return 'function'
    if (type === 'Object') return 'object'
    if (type === 'Date') return 'date'
    if (type === 'RegExp') return 'regexp'

    return type.toLowerCase()
  } catch (err) {
    return Object.prototype.toString.call(value)
      .replace(/^\[object |\]$/g, '')
      .toLowerCase()
  }
}

module.exports = konstrutor
module.exports.args = konstrutorArgs
module.exports.safe = konstructorSafe
module.exports.objs = konstructorObjs
