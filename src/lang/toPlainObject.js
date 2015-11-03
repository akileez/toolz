var baseCopy = require('../object/copy')
var keysIn = require('../object/keysIn')

// converts "value" to a plain object flattening inherited enumerable
// properties of "value" to own properties of the plain object

function toPlainObject (value) {
  return baseCopy(value, keysIn(value))
}

module.exports = toPlainObject

/*
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
*/
