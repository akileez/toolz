var sliced = require('../array/slice')
var co = require('../generator/co')

var noop = function(){}

/*
  Wrap a function to support
   sync, async, and gen functions.

   @param {Function} fn
   @return {Function}
   @api public

*/

function wrapped(fn) {
  function wrap() {
    var args = sliced(arguments)
    var last = args[args.length - 1]
    var ctx = this

    // done
    var done = typeof last === 'function'
      ? args.pop()
      : noop

    // nothing
    if (!fn) return done.apply(ctx, [null].concat(args))

    // async
    if (fn.length > args.length) {
      // NOTE: this only handles uncaught synchronous errors
      try {
        return fn.apply(ctx, args.concat(done))
      } catch (e) {
        return done(e)
      }
    }

    // generator
    if (generator(fn)) return co(fn).apply(ctx, args.concat(done))

    // sync
    return sync(fn, done).apply(ctx, args)
  }

  return wrap
}

/*
   Wrap a synchronous function execution.

   @param {Function} fn
   @param {Function} done
   @return {Function}
   @api private

*/

function sync (fn, done) {
  return function () {
    var ret

    try {
      ret = fn.apply(this, arguments)
    } catch (err) {
      return done(err)
    }

    if (promise(ret)) {
      ret.then(function (value) { done(null, value); }, done)
    } else {
      ret instanceof Error ? done(ret) : done(null, ret)
    }
  }
}

/**
 * Is `value` a generator?
 *
 * @param {Mixed} value
 * @return {Boolean}
 * @api private
 */

function generator(value) {
  return value
    && value.constructor
    && 'GeneratorFunction' == value.constructor.name
}


/**
 * Is `value` a promise?
 *
 * @param {Mixed} value
 * @return {Boolean}
 * @api private
 */

function promise(value) {
  return value && 'function' == typeof value.then
}

/**
 * Once
 */

function once(fn) {
  return function() {
    var ret = fn.apply(this, arguments)
    fn = noop
    return ret
  }
}

/**
 * Export `wrapped`
 */

module.exports = wrapped
