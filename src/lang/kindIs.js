// Return the constructor name if not a primative, array or function
// A more performant kindOf with cavets. Must test ES6 after upgrade.

var kindOf = require('./kindOf')

function konstrutor (value, safemode) {
  if (value === undefined) return 'undefined'
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'array'
  if (typeof value === 'function') return 'function'
  if (typeof value === 'string') return 'string'
  if (typeof value === 'boolean') return 'boolean'
  if (typeof value === 'number') return 'number'
  if (typeof value === 'symbol') return 'symbol'

  // this will pick out PlainObjects, regexps, and dates
  // more quickly than a toString.call(). Fails on arguments,
  // not really though --> arguments [object]
  return value.constructor.name.toLowerCase()

  // Object.create(null) throws an error. Code below
  // prevents this from happening with a performance
  // hit.
  // try {
  //   return value.constructor.name.toLowerCase()
  // } catch (err) {
  //   return kindOf(value)
  // }

}

function konstrutorArgs (value) {
  return kindOf(value) === 'arguments'
    ? 'arguments'
    : kindIs(value)
}

module.exports = konstrutor
module.exports.args = konstrutorArgs
