'use strict'

// An object is plain if it's created by either {}, new Object() or Object.create(null).

var toString = Object.prototype.toString

module.exports = function (x) {
  var prototype
  return toString.call(x) === '[object Object]'
    && (prototype = Object.getPrototypeOf(x), prototype === null || prototype === Object.getPrototypeOf({}))
}
