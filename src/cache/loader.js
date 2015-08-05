var path     = require('path')
var kindOf   = require('../lang/kindOf')
var flatten  = require('../array/flatten')
var slice    = require('../array/slice')
var isStream = require('../lang/isStream')

// create new instance of 'Loaders'
function Loaders (options) {
  if (!(this instanceof Loaders)) return new Loaders(options)
  options = options || {}
  this.cache = options.cache || {}
  this.iterator = options.iterator
}

// get loader stack from cache
function getStack (name) {
  return this.cache[name] || []
}

// create loader from other loaders
function register (name, laoders) {
  var args = slice(arguments, 1)
  var cached = this.getStack(name)
  var stack = this.buildStack(args).stack
  this.cache[name] = cached.concat(stack)
  return this
}

function buildStack (args, cache) {
  if (!Array.isArray(args)) throw new TypeError('Loaders#buildStack expects an array.')

  var len = args.length
  var i = 0
  var stack = []
  var other = []
  cache = cache || this.cache

  while (len--) {
    var arg = args[i++]
    var kind = kindOf(arg)

    if (kind === 'string' && cache[arg]) stack.push(cache[arg])
    else if (kind === 'function') stack.push(arg)
    else if (kind === 'array') stack.push.apply(stack, this.buildStack(arg, cache).stack)
    else if (isStream(arg)) stack.push(arg)
    else other.push(arg)
  }

  var res = {}
  res.stack = flatten(stack)
  res.args = other
  return res
}

// compose loader function from the given functions and/or the names of laoders
function compose () {
  var args = slice(arguments)
  var fns = this.buildStack(args).stack
  return this.iterator.call(this, fns)
}

Loaders.prototype.getStack   = getStack
Loaders.prototype.register   = register
Loaders.prototype.buildStack = buildStack
Loaders.prototype.compose    = compose

module.exports = Loaders
