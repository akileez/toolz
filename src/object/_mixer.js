var forOwn      = require('./forOwn')
var forIn       = require('./forIn')
var cloneDeep   = require('../lang/deepClone')
var isFunction  = require('../lang/isFunction')
var isUndefined = require('../lang/isUndefined')
var forEach     = require('../array/forEach')
var slice       = require('../array/slice')
var isMergeable = require('./is-object')

function mixer () {
  var opts = arguments[0] === undefined ? {} : arguments[0];
  if (opts.deep && !opts._innerMixer) {
    opts._innerMixer = true
    opts._innerMixer = mixer(opts)
  }

  return function mix (target /*, sources*/) {
    var sources = slice(arguments, 1)
    if (isUndefined(target) || (!opts.noOverwrite && !isMergeable(target))) {
      if (sources.length > 1) {
        return mixer({}, sources.join(', '))
      }
      return cloneDeep(sources[0])
    }

    if (opts.noOverwrite) {
      if (!isMergeable(target) || !isMergeable(sources[0])) {
        return target
      }
    }

    function iteratee (sourceValue, key) {
      const targetValue = target[key]
      if (opts.filter && !opts.filter(sourceValue, targetValue, key)) {
        return
      }

      const result = opts.deep ? opts._innerMixer(targetValue, sourceValue) : sourceValue
      target[key] = opts.transform ? opts.transform(result, targetValue, key) : result
    }

    const loop = opts.chain ? forIn : forOwn
    forEach(sources, function (obj) {
      loop(obj, iteratee)
    })

    return target
  }
}

const isNotFunction = function (val) {
  return !isFunction(val)
}

const mixin = mixer()

const mixinFunctions = mixer({
  filter: isFunction
})

const mixinChainFunctions = mixer({
  filter: isFunction,
  chain: true
})

const merge = mixer({
  deep: true
})

const mergeUnique = mixer({
  deep: true,
  noOverwrite: true
})

const mergeChainNonFunctions = mixer({
  filter: isNotFunction,
  deep: true,
  chain: true
})

module.exports = mixer
module.exports.mixin = mixin
module.exports.mixinFunctions = mixinFunctions
module.exports.mixinChainFunctions = mixinChainFunctions
module.exports.merge = merge
module.exports.mergeUnique = mergeUnique
module.exports.mergeChainNonFunctions = mergeChainNonFunctions
