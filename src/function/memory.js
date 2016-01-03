var Cache = require('../cache/mappr')
var apply = require('../function/apply')

function memory (func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError('Expected a function')
  }

  var memorize = function () {
    var args = arguments
    var key = resolver ? apply(resolver, this, args) : args[0]
    var cache = memorize.cache

    if (cache.has(key)) return cache.get(key)

    var result = apply(func, this, args)
    memorize.cache = cache.set(key, result)
    return result
  }

  memorize.cache = Cache()

  return memorize
}

module.exports = memory
