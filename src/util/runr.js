// adopted from: ygor <https://github.com/shannonmoeller/ygor>
// © 2016 Shannon Moeller me@shannonmoeller.com (MIT)

var argv = require('./argh').argv
var clr = require('./colorz')

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
  if (typeof name !== 'string')
    throw new Error('Task name must be a string')
  if (typeof callback !== 'function')
    throw new Error('Task callback must be a function')

  tasks[name] = callback

  return exports
}

exports.run = run
exports.task = task

process.nextTick(run.bind(null, cmd))
