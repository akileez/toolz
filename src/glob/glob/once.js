// adopted from https://github.com/isaacs/once
// Copyright (c) Isaac Z. Schlueter and Contributors (ISC)

var wrappy = require('./wrappy')

module.exports = wrappy(once)

function once (fn) {
  var f = function () {
    if (f.called) return f.value
    f.called = true
    return f.value = fn.apply(this, arguments)
  }
  f.called = false
  return f
}

// once.proto = once(function () {
//   Object.defineProperty(Function.prototype, 'once', {
//     value: function () {
//       return once(this)
//     },
//     configurable: true
//   })
// })


