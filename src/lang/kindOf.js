function kindOf (value) {
  return typeof value === 'object'
    ? Object.prototype.toString.call(value)
      .replace(/^\[object |\]$/g, '')
      .toLowerCase()
    : typeof value
}

function kindOfType (value) {
  // Return the constructor name if not a primative, array or function
  // A more performant `kindOf` with cavets. Must test ES6 after upgrade.
  // Does not handle arguments.
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
  if (type === 'RegExp') return 'regexp'
  if (type === 'Date') return 'date'

  return type.toLowerCase()
}

function kindOfObjs (value) {
  // a speedy version to obtain common object "types"
  // Does not handle arguments.
  if (typeof value === 'function') return 'function'
  if (Array.isArray(value)) return 'array'
  if (typeof value === 'string') return 'string'

  var type = value.constructor.name

  if (type === 'Object') return 'object'
  if (type === 'RegExp') return 'regexp'
  if (type === 'Date') return 'date'

  return type.toLowerCase()
}

function kindOfSafe (value) {
  // Object.create(null) throws an error. Code below
  // prevents this from happening. Does not handle arguments.
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
    if (type === 'RegExp') return 'regexp'
    if (type === 'Date') return 'date'

    return type.toLowerCase()
  } catch (err) {
    return Object.prototype.toString.call(value)
      .replace(/^\[object |\]$/g, '')
      .toLowerCase()
  }
}

module.exports = kindOf
module.exports.type = kindOfType
module.exports.objs = kindOfObjs
module.exports.safe = kindOfSafe
