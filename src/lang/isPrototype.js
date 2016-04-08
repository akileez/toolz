/*
  from lodash
  Checks if `val` is likely a prototype object
*/

function isPrototype (val) {
  var Ctor = val && val.constructor
  var proto = (typeof Ctor === 'function' && Ctor.prototype) || Object.prototype

  return val === proto
}

module.exports = isPrototype
