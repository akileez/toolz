'use strict'

var slice    = require('../../array/slice')
var forEach  = require('../../array/forEach')
var isArray  = require('../../lang/isArray')
var once     = require('./once')
var emitter  = require('./emitter')
var debounce = require('./debounce')

module.exports = function queue (worker, concurrency) {
  var q = []
  var load = 0
  var max = concurrency || 1
  var paused

  var qq = emitter({
    push: manipulate.bind(null, 'push'),
    unshift: manipulate.bind(null, 'unshift'),
    pause: function pause () {
      paused = true
    },
    resume: function resume () {
      paused = false
      debounce(labor)
    },
    pending: q
  })

  if (Object.defineProperty && !Object.definePropertyPartial) {
    Object.defineProperty(qq, 'length', {
      get: function getter () {
        return q.length
      }
    })
  }

  function manipulate (how, task, done) {
    var tasks = isArray(task) ? task : [task]

    forEach(tasks, function insert (t) {
      q[how]({ t: t, done: done })
    })
    // tasks.forEach(function insert (t) { q[how]({ t: t, done: done }); });
    debounce(labor)
  }

  function labor () {
    if (paused || load >= max) return
    if (!q.length) {
      if (load === 0) qq.emit('drain')
      return
    }

    load++
    ;var job = q.pop()
    worker(job.t, once(complete.bind(null, job)))
    debounce(labor)
  }

  function complete (job) {
    load--
    ;debounce(job.done, slice(arguments, 1))
    debounce(labor)
  }

  return qq
}
