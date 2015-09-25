// inspired by sindresorhus/object-assign
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com) (MIT)

var toObject = require('../lang/toObject')

var propIsEnumerable = Object.prototype.propertyIsEnumerable

function ownEnumerableKeys (obj) {
  var keys = Object.getOwnPropertyNames(obj)
  if (Object.getOwnPropertySymbols) {
    keys = keys.concat(Object.getOwnPropertySymbols(obj))
  }

  return keys.filter(function (key) {
    return propIsEnumerable.call(obj, key)
  })
}

module.exports = Object.assign || function (target, source) {
  var from
  var keys
  var to = toObject(target)
  var s = 0
  var len = arguments.length

  while (++s < len) {
    from = arguments[s]
    keys = ownEnumerableKeys(Object(from))

    for (var i = 0; i < keys.length; i++) {
      to[keys[i]] = from[keys[i]]
    }
  }
  return to
}
