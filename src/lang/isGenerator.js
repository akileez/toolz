var kind = require('./kind')

function isGenerator (fn) {
  if (typeof fn !== 'function') return false

  return (fn.constructor && fn.constructor.name === 'GeneratorFunction')
    || kind.Of(fn) === 'generatorfunction'
}

module.exports = isGenerator
