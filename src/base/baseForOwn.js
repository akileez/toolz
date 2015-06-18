var baseFor = require('./baseFor')
var keys = require('../object/keys')

function baseForOwn (obj, iteratee) {
  return baseFor(obj, iteratee, keys)
}

module.exports = baseForOwn
