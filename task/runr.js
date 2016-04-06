// adopted from: ygor <https://github.com/shannonmoeller/ygor>
// © 2016 Shannon Moeller me@shannonmoeller.com (MIT)

var argv   = require('../src/process/argh').argv
var clr    = require('../src/util/colorz')
var assert = require('assert')

var cmd     = argv.argv || 'default'
var tasks   = Object.create(null)

function error (err) {
  console.error(err && err.stack || err)

  return exports
}

function run (name) {
  if (!(name in tasks)) {
    console.log(clr.cyan('\nTasks:  ') + clr.magenta(Object.keys(tasks).join('  ')))
    return
  }

  return Promise
    .resolve(tasks[name]())
    .catch(error)
}

function task (name, callback) {
  assert(typeof name, 'string', 'Task name must be a string')
  assert(typeof callback, 'function', 'Task callback must be a function')

  tasks[name] = callback

  return exports
}

exports.run = run
exports.task = task
exports.opts = argv
exports.error = error

process.nextTick(run.bind(null, cmd))
