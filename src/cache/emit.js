// adopted from namespace-emitter <https://github.com/sethvincent/namespace-emitter>
// Copyright (c) 2015 Seth Vincent

var stamp   = require('../object/stampit')
var keys    = require('../object/keys')
var slice   = require('../array/slice')
var forEach = require('../array/forEach')
var apply   = require('../function/apply')

// Small event-emitter stamp.

module.exports = stamp()
  .initializers({
    function () {
      this._fns = {}
    }
  })
  .methods({
    emit : emit,
    on   : on,
    once : once,
    off  : off
  })

// Emit an event. Optionally namespace the event.
// Separate the namespace and event with a `:`
function emit (event) {
  var args = slice(arguments, 1)
  var namespaced = namespaces(event, this)
  if (this._fns[event]) emitAll(event, this._fns[event], args)
  if (namespaced) emitAll(event, namespaced, args)
}

// Create an event listener
function on (event, fn) {
  if (typeof fn !== 'function') throw new Error('callback required')
  ;(this._fns[event] = this._fns[event] || []).push(fn)
}

// Create an event listener that fires once
function once (event, fn) {
  var that = this
  function one () {
    fn.apply(this, arguments)
    that.off(event, one)
  }
  this.on(event, one)
}

// Stop listening to an event.
// Stop all listeners on an event by only passing the event name.
// Stop a single listener by passing that event handler as a callback.
// You must be explicit about what will be unsubscribed:
//   `emitter.off('demo')` will unsubscribe an `emitter.on('demo')` listener,
//   `emitter.off('demo:example')` will unsubscribe an `emitter.on('demo:example')` listener
function off (event, fn) {
  var keep = []

  if (event && fn) {
    var i = -1
    var len = this._fns.length

    while (++i < len) {
      if (this._fns[i] !== fn) keep.push(this._fns[i])
    }
  }

  keep.length ? this._fns[event] = keep : delete this._fns[event]
}

// Private methods
function namespaces (e, emitter) {
  var out = []
  var args = e.split(':')
  var fns = emitter._fns

  forEach(keys(fns), function (key) {
    if (key === '*') out = out.concat(fns[key])
    if (args.length === 2 && args[0] === key) out = out.concat(fns[key])
  })

  return out
}

function emitAll (e, fns, args) {
  var i = -1
  var len = fns.length

  while (++i < len) {
    if (!fns[i]) break
    fns[i].event = e
    apply(fns[i], fns[i], args)
  }
}
