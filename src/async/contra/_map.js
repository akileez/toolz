'use strict'

var isArray      = require('../../lang/isArray')
var forEach      = require('../../array/forEach')
var økeys        = require('../../object/keys')
var once         = require('./once')
var concurrent   = require('./concurrent')
var CONCURRENTLY = require('./CONCURRENTLY')
var SERIAL       = require('./SERIAL')

module.exports = function _map (cap, then, attached) {
  function api (collection, concurrency, iterator, done) {
    var args = arguments

    if (args.length === 2) { iterator = concurrency; concurrency = CONCURRENTLY; }
    if (args.length === 3 && typeof concurrency !== 'number') {
      done = iterator
      iterator = concurrency
      concurrency = CONCURRENTLY
    }

    var keys = økeys(collection)
    var tasks = isArray(collection) ? [] : {}

    forEach(keys, function insert (key) {
      tasks[key] = function iterate (cb) {
        if (iterator.length === 3) {
          iterator(collection[key], key, cb)
        } else {
          iterator(collection[key], cb)
        }
      }
    })
    // keys.forEach(function insert (key) {
    //   tasks[key] = function iterate (cb) {
    //     if (iterator.length === 3) {
    //       iterator(collection[key], key, cb);
    //     } else {
    //       iterator(collection[key], cb);
    //     }
    //   };
    // });

    concurrent(tasks, cap || concurrency, then ? then(collection, once(done)) : done)
  }

  if (!attached) api.series = _map(SERIAL, then, true)

  return api;
}