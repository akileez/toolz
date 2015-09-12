// adopted from: to-flag <https://github.com/jonschlinkert/to-flag>
// Copyright (c) 2015, Jon Schlinkert. (MIT)

var dashify = require('./dashCase')
var isPrimitive = require('../lang/isPrimitive')

function toArgs (key, val, opts) {
  if (!key || typeof key !== 'string')
    throw new TypeError('toArgs expects a string')

  if (Array.isArray(val)) val = val.join(',')
  if (!isPrimitive(val))
    throw new TypeError('toArgs expects an array or primitive for the second argument')

  if (val === true) val = null

  if (val === false && (!opts || opts && opts.invert !== false)) key = 'no-' + key

  key = '--' + (key.length === 1 ? key.toLowerCase() : dashify(key))

  return key + (val ? quote(val) : '')
}

function quote (str) {
  return str.split(' ').length > 1
    ? '=' + '"' + str + '"'
    : '=' + str
}

module.exports = toArgs
