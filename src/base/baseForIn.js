var baseFor = require('./baseFor')
var keysIn = require('../object/keysIn')

function baseForIn (obj, iteratee) {
  return baseFor(obj, iteratee, keysIn)
}

module.exports = baseForIn
