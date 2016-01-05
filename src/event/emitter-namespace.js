// adopted from namespace-emitter <https://github.com/sethvincent/namespace-emitter>
// Copyright (c) 2015 Seth Vincent

var slice = require('../array/slice')
var forEach = require('../array/forEach')
var keys = require('../object/keys')

// Create an event emitter with namespaces
//   var emitter = require('./index')()

//   emitter.on('*', function () {
//     console.log('all events emitted', this.event)
//   })

//   emitter.on('example', function () {
//     console.log('example event emitted')
//   })

function createNamespaceEmitter () {
  var emitter = {
    _fns: {}
  }

  // Emit an event. Optionally namespace the event.
  // Separate the namespace and event with a `:`
  emitter.emit = function emit (event) {
    var args = slice(arguments, 1)
    var namespaced = namespaces(event)
    if (this._fns[event]) emitAll(event, this._fns[event], args)
    if (namespaced) emitAll(event, namespaced, args)
  }

  // Create an event listener
  emitter.on = function on (event, fn) {
    if (typeof fn !== 'function') throw new Error('callback required')
    ;(this._fns[event] = this._fns[event] || []).push(fn)
  }

  // Create an event listener that fires once
  emitter.once = function once (event, fn) {
    function one () {
      fn.apply(this, arguments)
      emitter.off(event, one)
    }
    this.on(event, one)
  }

  // Stop listening to an event.
  // Stop all listeners on an event by only passing the event name.
  // Stop a single listener by passing that event handler as a callback.
  // You must be explicit about what will be unsubscribed:
  //   `emitter.off('demo')` will unsubscribe an `emitter.on('demo')` listener,
  //   `emitter.off('demo:example')` will unsubscribe an `emitter.on('demo:example')` listener
  emitter.off = function off (event, fn) {
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

  function namespaces (e) {
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
      fns[i].apply(fns[i], args)
    }
  }

  return emitter
}

module.exports = createNamespaceEmitter
