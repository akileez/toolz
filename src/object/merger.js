'use strict'

const isObject      = require('./is-object')
const isPlainObject = require('../lang/isPlainObject')
const slice         = require('../array/slice')
const reduce        = require('../array/reduce')

/**
 * The 'src' argument plays the command role.
 * The returned values is always of the same type as the 'src'.
 * @param dst
 * @param src
 * @returns {*}
 */

function mergeOne(dst, src) {
  if (src === undefined) return dst

  // According to specification arrays must be concatenated.
  // Also, the '.concat' creates a new array instance. Overrides the 'dst'.
  if (Array.isArray(src)) return (Array.isArray(dst) ? dst : []).concat(src)

  // Now deal with non plain 'src' object. 'src' overrides 'dst'
  // Note that functions are also assigned! We do not deep merge functions.
  if (!isPlainObject(src)) return src

  // See if 'dst' is allowed to be mutated. If not - it's overridden with a new plain object.
  const returnValue = isObject(dst) ? dst : {}

  const keys = Object.keys(src)

  for (let i = 0; i < keys.length; i += 1) {
    const key = keys[i]

    const srcValue = src[key]
    // Do not merge properties with the 'undefined' value.
    if (srcValue !== undefined) {
      const dstValue = returnValue[key]
      // Recursive calls to mergeOne() must allow only plain objects or arrays in dst
      const newDst = isPlainObject(dstValue) || Array.isArray(srcValue) ? dstValue : {}

      // deep merge each property. Recursion!
      returnValue[key] = mergeOne(newDst, srcValue)
    }
  }

  return returnValue
}

function merge (dst) {
  let srcs = slice(arguments, 1)
  return reduce(srcs, mergeOne, dst)
}

module.exports = merge
