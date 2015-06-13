// from  is-primitive <https://github.com/jonschlinkert/is-primitive>
// Licensed under the MIT License.

function isPrimitive (value) {
  return value == null || (typeof value != 'function' && typeof value !== 'object')
}

module.exports = isPrimitive
