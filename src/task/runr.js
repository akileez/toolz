// adopted from: ygor <https://github.com/shannonmoeller/ygor>
// © 2016 Shannon Moeller me@shannonmoeller.com (MIT)

var argv = require('../process/argh').argv
var clr = require('../util/colorz')
var assert = require('assert')

var cmd = argv.argv || 'default'
var tasks = Object.create(null)

function logError (err) {
  console.error(err && err.stack || err)
}

function run (name) {
  if (!(name in tasks)) {
    console.log(clr.cyan('Tasks:\n  ') + clr.magenta(Object.keys(tasks).join('\n  ')))
    return
  }

  return Promise
    .resolve(tasks[name]())
    .catch(logError)
}

function task (name, callback) {
  assert(typeof name, 'string', 'Task name must be a string')
  assert(typeof callback, 'function', 'Task callback must be a function')

  tasks[name] = callback

  return exports
}

exports.run = run
exports.task = task
exports.args = argv

process.nextTick(run.bind(null, cmd))
