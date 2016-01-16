'use strict'

var isArray = require('../../lang/isArray')
var forEach = require('../../array/forEach')
var keys    = require('../../object/keys')
var _map    = require('./_map')

module.exports = function filter (concurrency) {
  return _map(concurrency, then)

  function then (collection, done) {
    return function filter (err, results) {
      function exists (item, key) {
        return !!results[key]
      }

      function ofilter () {
        var filtered = {}

        forEach(keys(collection), function omapper (key) {
          if (exists(null, key)) filtered[key] = collection[key]
        })

        // Object.keys(collection).forEach(function omapper (key) {
        //   if (exists(null, key)) { filtered[key] = collection[key]; }
        // })

        return filtered
      }

      if (err) {
        done(err)
        return
      }

      done(null, isArray(results)
        ? collection.filter(exists)
        : ofilter()
      )
    }
  }
}
