/*!
 * prr
 * (c) 2013 Rod Vagg <rod@vagg.org>
 * https://github.com/rvagg/prr
 * License: MIT
 */

function prr() {
  var setProperty = typeof Object.defineProperty == 'function'
    ? function (obj, key, options) {
        Object.defineProperty(obj, key, options)
        return obj
      }
    : function (obj, key, options) { // < es5
        obj[key] = options.value
        return obj
      }

  var makeOptions = function (value, options) {
    var oo = typeof options == 'object'
    var os = !oo && typeof options == 'string'
    var op = function (p) {
      return oo ? !!options[p] : os ? options.indexOf(p[0]) > -1 : false
    }

    return {
      enumerable: op('enumerable'),
      configurable: op('configurable'),
      writable: op('writable'),
      value: value
    }
  }

  var prr = function (obj, key, value, options) {
    var k

    options = makeOptions(value, options)

    if (typeof key == 'object') {
      for (k in key) {
        if (Object.hasOwnProperty.call(key, k)) {
          options.value = key[k]
          setProperty(obj, k, options)
        }
      }
      return obj
    }

    return setProperty(obj, key, options)
  }

  return prr
}

module.exports = prr
