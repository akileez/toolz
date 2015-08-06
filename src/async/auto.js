var ensure = require('./ensure')
// adopted from:
// https://github.com/feross/run-auto
// Copyright (c) Feross Aboukhadijeh (MIT)
// using process.nextTick not setImmediate
// and not using dezalgo, will use ./ensure.js instead (on the callback)
// which happens to use process.nextTick as well.

function auto (tasks, done) {
  if (done) done = ensure(done)
  var results = {}
  var listeners = []

  var keys = Object.keys(tasks)
  var remainingTasks = keys.length

  if (!remainingTasks) return done && done(null, results)

  function addListener (fn) {
    listeners.unshift(fn)
  }

  function removeListener (fn) {
    for (var i = 0; i < listeners.length; i += 1) {
      if (listeners[i] === fn) {
        listeners.splice(i, 1)
        return
      }
    }
  }

  function taskComplete () {
    remainingTasks -= 1
    listeners.slice(0).forEach(function (fn) {
      fn()
    })
  }

  addListener(function () {
    if (!remainingTasks && done) {
      var thisdone = done
      // prevent final done from calling itself if it errors
      done = null
      thisdone(null, results)
    }
  })

  keys.forEach(function (key) {
    var task = Array.isArray(tasks[key])
      ? tasks[key]
      : [tasks[key]]
    var requires = task.slice(0, task.length - 1)

    var taskdone = function (err) {
      var args = [].slice.call(arguments, 1)
      if (args.length <= 1) {
        args = args[0]
      }

      if (err) {
        var safeResults = {}
        Object.keys(results).forEach(function (rkey) {
          safeResults[rkey] = results[rkey]
        })

        safeResults[key] = args
        if (done) done(err, safeResults)
        // stop subsequent errors hitting done multiple times
        done = null
      } else {
        results[key] = args
        process.nextTick(function () {
          taskComplete()
        })
      }
    }

    var ready = function () {
      return requires.reduce(function (a, x) {
        return a && results.hasOwnProperty(x)
      }, true) && !results.hasOwnProperty(key)
    }

    if (ready()) {
      task[task.length - 1](taskdone, results)
    } else {
      var listener = function () {
        if (ready()) {
          removeListener(listener)
          task[task.length - 1](taskdone, results)
        }
      }
      addListener(listener)
    }
  })
}

module.exports = auto
