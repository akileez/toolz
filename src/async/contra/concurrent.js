'use strict'

var slice = require('../../array/slice')
var isArray = require('../../lang/isArray')
var once = require('./once')
var queue = require('./queue')
var errored = require('./errored')
var debounce = require('./debounce')
var CONCURRENTLY = require('./CONCURRENTLY')

module.exports = function concurrent (tasks, concurrency, done) {
  if (typeof concurrency === 'function') {
    done = concurrency
    concurrency = CONCURRENTLY
  }

  var d = once(done)
  var q = queue(worker, concurrency)
  var keys = Object.keys(tasks)
  var results = isArray(tasks) ? [] : {}

  q.unshift(keys)
  q.on('drain', function completed () {
    d(null, results)
  })

  function worker (key, next) {
    debounce(tasks[key], [proceed])

    function proceed () {
      var args = slice(arguments)
      if (errored(args, d)) return

      results[key] = args.shift()
      next()
    }
  }
}
