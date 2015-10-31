// adopted from: deep-assign <https://github.com/sindresorhus/deep-assign>
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com) (MIT)

var isObject = require('../lang/isObject')
var hasOwnProperty = Object.prototype.hasOwnProperty
var propEnum = Object.prototype.propertyIsEnumerable

function toObject (val) {
  if (val == null) throw new TypeError('Sources cannot be null or undefined.')
  return Object(val)
}

function base (to, from) {
  if (to === from) return to

  from = Object(from)

  for (var key in from) {
    if (hasOwnProperty.call(from, key)) {
      var val = from[key]

      if (isArray(val)) to[key] = val.slice()
      else if (isObject(val)) to[key] = base(to[key] || {}, val)
      else if (val !== undefined) to[key] = val
    }
  }

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(from)

    for (var i = 0; i < symbols.length; i++) {
      if (propEnum.call(from, symbols[i])) to[symbols[i]] = from[symbols[i]]
    }
  }

  return to
}

function deepAssign (target) {
  target = toObject(target)
  var s = 0

  while (++s < arguments.length) {
    base(target, arguments[s])
  }

  return target
}

module.exports = deepAssign
