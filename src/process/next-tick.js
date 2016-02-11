// https://github.com/medikoo/next-tick
// Copyright (C) 2012 Mariusz Nowak (www.medikoo.com) (MIT)

'use strict'

/*
  To be used in environment agnostic modules that need nextTick functionality.

  When run in Node.js process.nextTick is used
  In modern browsers microtask resolution is guaranteed by MutationObserver
  In other engines setImmediate or setTimeout(fn, 0) is used as fallback.
  If none of the above is supported module resolves to null

*/

var callable
var byObserver

callable = function (fn) {
  if (typeof fn !== 'function') throw new TypeError(fn + " is not a function")
  return fn
}

byObserver = function (Observer) {
  var node = document.createTextNode('')
  var queue
  var i = 0

  new Observer(function () {
    var data

    if (!queue) return

    data = queue
    queue = null

    if (typeof data === 'function') {
      data()
      return
    }

    data.forEach(function (fn) {fn()})
  }).observe(node, {characterData: true})

  return function (fn) {
    callable(fn)

    if (queue) {
      if (typeof queue === 'function') queue = [queue, fn]
      else queue.push(fn)
      return
    }

    queue = fn
    node.data = (i = ++i % 2)
  }
}

module.exports = (function () {
  // Node.js
  if ((typeof process === 'object') && process
    && (typeof process.nextTick === 'function')) {
    return process.nextTick
  }

  // MutationObserver
  if ((typeof document === 'object') && document) {
    if (typeof MutationObserver === 'function') {
      return byObserver(MutationObserver)
    }
    if (typeof WebKitMutationObserver === 'function') {
      return byObserver(WebKitMutationObserver)
    }
  }

  // W3C Draft
  // http://dvcs.w3.org/hg/webperf/raw-file/tip/specs/setImmediate/Overview.html
  if (typeof setImmediate === 'function') {
    return function (cb) {
      setImmediate(callable(cb))
    }
  }

  // Wide available standard
  if ((typeof setTimeout === 'function') || (typeof setTimeout === 'object')) {
    return function (cb) {
      setTimeout(callable(cb), 0)
    }
  }

  return null
}())
