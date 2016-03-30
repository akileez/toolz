// https://github.com/cristiandouce/merge-util

var type = require('../lang/kind').Of
var isEmpty = require('../lang/isEmpty')

var has = Object.prototype.hasOwnProperty

/**
 * Merge `b` into `a`.
 *
 * @param {Object} a
 * @param {Object} b
 * @param {Object} opts
 * @return {Object} a
 * @api public
 */

function merge (a, b, opts) {
  opts = (typeof opts === 'boolean')
    ? {inheritance: opts}
    : opts || {inheritance: false, shallow: false, discardEmpty: true}

  var key
  for (key in b) {
    var copy = !!opts.inheritance
     ? b[key] != null
     : (has.call(b, key)) && b[key] != null

    if (copy) {
      if (!a) a = {}
      if (!opts.shallow && type(b[key]) === 'object') {
        if (!opts.discardEmpty && isEmpty(a[key]) && isEmpty(b[key])) {
          // Preserve { }, null, undefined, 0 as they were
          a[key] = b[key]
        } else {
          // merge recursively
          a[key] = merge(a[key], b[key], opts)
        }
      } else {
        a[key] = b[key]
      }
    }
  }
  return a
};

module.exports = merge
