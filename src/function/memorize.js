var MapCache = require('../base/MapCache')

/**
 * lodash memorize
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is coerced to a string and used as the
 * cache key. The `func` is invoked with the `this` binding of the memoized
 * function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the [`Map`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-properties-of-the-map-prototype-object)
 * method interface of `get`, `has`, and `set`.
 */

function memorize (func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError('Expected a function')
  }
  var memorized = function () {
    var args = arguments
    var key = resolver ? resolver.apply(this, args) : args[0]
    var cache = memorized.cache

    if (cache.has(key)) return cache.get(key)

    var result = func.apply(this, args)
    memorized.cache = cache.set(key, result)
    return result
  }
  memorized.cache = new memorize.Cache

  return memorized
}

memorize.Cache = MapCache

module.exports = memorize