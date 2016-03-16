// adopted from: runnel <https://github.com/thlorenz/runnel>
// Copyright 2013 Thorsten Lorenz. (MIT)

'use strict'

var slice    = require('../array/slice')
var isArray  = require('../lang/isArray')
var isObject = require('../lang/isObject')
var øvals    = require('../object/values')

function validate (funcs) {
  function emsg (i) {
    throw new Error('All arguments passed to itera need to be a function. Argument at (zero based) position ' + i + ' is not.')
  }

  var len = funcs.length
  var i = -1

  if (len < 2)
    throw new Error('Give itera at least 2 functions to do any work.')

  while (++i < len) {
    if (typeof funcs[i] !== 'function') emsg(i)
  }
}

function addDetails (err) {
  try {
    err.message = (err.message || '') + '\nDetails:\n' + err.stack
  } catch (e) {
    // the error object is sealed, frozen or the message property is read-only
    var newError = new Error()
    newError.message = (err.message || '') + '\nDetails:\n' + err.stack
    newError.type = err.type
    newError.stack = err.stack
    err = newError
  }

  return err
}

function itera (arg) {
  var funcs = isArray(arg)
    ? arg
    : isObject(arg)
      ? øvals(arg)
      : slice(arguments)

  validate(funcs)

  var done = funcs.pop()
  var func = funcs.shift()
  var bailed = false

  function handler (err, res /* optional and could be more than one */) {
    // Prevent re-triggering call chain when a func calls back with an err first and without one later
    if (bailed) return
    var args

    // Bail if any of the funcs encounters a problem
    if (err) {
      bailed = true
      args = slice(arguments)
      addDetails(err)
      done.apply(this, args)
      return
    }

    func = funcs.shift()

    if (func) {
      // get args without err
      args = slice(arguments, 1)

      // this handler becomes the callback for the current func we are calling
      args.push(handler)

      try {
        func.apply(this, args)
      } catch (err) {
        bailed = true
        done.call(this, addDetails(err))
        return
      }
    } else {
      args = slice(arguments)
      done.apply(this, args)
    }
  }

  func.call(this, handler)
}

itera.seed = function () {
  var args = [null].concat(slice(arguments))
  var that = this

  return (cb) => {
    process.nextTick(() => {
      cb.apply(that, args)
    })
  }
}

module.exports = itera
