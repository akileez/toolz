var dashify = require('./dashCase')
var isPrimitive = require('../lang/isPrimitive')

function toArgs (key, val, opts) {
  if (!key || typeof key !== 'string')
    throw new TypeError('toArgs expects a string')

  if (Array.isArray(val)) val = val.join(',')
  if (!isPrimitive(val))
    throw new TypeError('toArgs expects an array or primitive for the second argument')

  if (val === true) val = null

  // the next two blocks are hacks to achieve the results
  // I am looking for. This needs to be refactored. I use argh as
  // my argv processor and single letters are used as Booleans
  if (val === false && (!opts || opts && opts.invert !== false)) {
    // key = 'no-' + key
    key = key.length === 1
      ? ''
      : 'no-' + key
  }

  // key = '--' + (key.length === 1 ? key.toLowerCase() : dashify(key))
  key = (key.length === 1 || key === '')
    ? (key === '' ? '' : '-' + key.toLowerCase())
    : '--' + dashify(key)

  return key + (val ? '=' + val : '')
}

module.exports = toArgs
