var assert = require('assert')
var where = require('../../src/collection/where')
var pluck = require('../../src/collection/pluck')
var flatten = require('../../src/array/flatten')
var forEach = require('../../src/collection/forEach')
var isFunction = require('../../src/lang/isFunction')

function getExtensions (lastArg) {
  if (typeof lastArg !== 'function') return lastArg
}

function buildOnSettled (done) {
  done = done || noop

  function onSettled (error, result) {
    if (error) return done(error, null)

    var settledErrors = where(result, {state: 'error'})
    var settledResults = where(result, {state: 'success'})

    var errors = null
    if (settledErrors.length) errors = pluck(settledErrors, 'value')

    var results = null
    if (settledResults.length) results = pluck(settledResults, 'value')

    done(errors, results)
  }

  return onSettled
}

function verifyArguments (args) {
  args = flatten(args)
  var lastIdx = args.length - 1

  assert.ok(args.length, 'A set of functions to combine is required')

  forEach(args, function (arg, argIdx) {
    var isFunc = isFunction(arg)
    if (isFunc) return
    if (argIdx === lastIdx) return // last arg can be an object of extension points

    var msg = 'Only functions can be combined, got ' + typeof arg + ' for argument ' + argIdx
    assert.ok(isFunc, msg)
  })

  return args
}

function noop () {}

var defaultExts = {
  create: noop,
  before: noop,
  after: noop,
  error: noop
}

function defaultExtensions (extensions) {
  extensions = extensions || {}
  return {
    create: extensions.create || defaultExts.create,
    before: extensions.before || defaultExts.before,
    after: extensions.after || defaultExts.after,
    error: extensions.error || defaultExts.error
  }
}

function initializeResults (values) {
  var keys = Object.keys(values)
  var results = Array.isArray(values) ? [] : {}

  var i = -1
  var len = keys.length

  while (++i < len) {
    var key = keys[i]
    results[key] = undefined
  }

  return results
}

module.exports = {
  getExtensions: getExtensions,
  onSettled: buildOnSettled,
  verifyArguments: verifyArguments,
  noop: noop,
  defaultExtensions: defaultExtensions,
  initializeResults: initializeResults
}
