var stampit  = require('../object/stampit')
var slice    = require('../array/slice')
var flatten  = require('../array/flatten')
var kindOf   = require('../lang/kindOf')
// var isStream = require('../lang/isStream') // not using Streams yet.

module.exports = stampit()
  .methods({
    task: loader,
    run: run,
    exc: execute
  })
  .initializers([
    function () {
      this.tasks = {}
    }
  ])

function run (name) {
  return this.tasks[name] || this.queue[name]
}

function execute (name) {
  var len = this.tasks[name].length
  if (len < 2) return this.tasks[name]()
  var i = -1
  while (++i < len) this.tasks[name][i]()
}

// create task loader
function loader (name, laoders) {
  var args = slice(arguments, 1)

  // get loader stack from cache
  var cached = this.tasks[name] || []

  if (!args.length) return cached

  var stack = buildStack(args, this.tasks).stack
  this.tasks[name] = stack.length < 2 ? stack[0] : flatten(stack)
  return this
}

// private method
function buildStack (args, cache) {
  // args isArray check not needed here. private function. one call made from this.loader()
  // the following in is commented out.
  // if (!Array.isArray(args)) throw new TypeError('Loaders#buildStack expects an array.')

  var len = args.length
  var i = 0
  var stack = []
  var other = []

  // this is a function private therefore I will need to pass the cache in manually
  // as a result the following line is commented out.
  // cache = cache || this.tasks

  while (len--) {
    var arg = args[i++]
    var kind = kindOf(arg)

    if (kind === 'string' && cache[arg]) stack.push(cache[arg])
    else if (kind === 'function') stack.push(arg)
    else if (kind === 'array') stack.push.apply(stack, buildStack(arg, cache).stack)
    // -- not using Streams yet...
    // else if (isStream(arg)) stack.push(arg)
    else other.push(arg)
  }

  var res = {}
  res.stack = stack
  res.args = other
  return res
}
