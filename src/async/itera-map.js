'use strict'

var asyncReduce = require('./itera-reduce')

function asyncMap (obj, iterator, done) {
  function mapArrIterator (acc, val, key, next) {
    iterator(val, key, (err, res) => {
      acc.push(res)
      next(err, acc)
    })
  }

  function mapObjIterator (acc, val, key, next) {
    iterator(val, key, (err, res) => {
      acc[key] = res
      next(err, acc)
    })
  }

  var seed
  var mapIterator

  if (Array.isArray(obj)) {
    seed = []
    mapIterator = mapArrIterator
  } else {
    seed = {}
    mapIterator = mapObjIterator
  }

  asyncReduce(obj, seed, mapIterator, done)
}

module.exports = asyncMap
