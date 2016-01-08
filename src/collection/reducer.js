// adopted from: https://github.com/Raynos/reduce
// Copyright (c) 2012 Raynos. (MIT)

var Okeys = require('../object/keys')

function reduce (list, iterator) {
  var keys = Okeys(list)
  var i = -1
  var accumulator = list[0]
  var context = this

  if (arguments.length === 2) i = 0
  else if (arguments.length === 3) accumulator = arguments[2]
  else if (arguments.length === 4) {
    context     = arguments[2]
    accumulator = arguments[3]
  }

  // for (var len = keys.length; i < len; i++) {
  //   var key = keys[i]
  //   var value = list[key]

  //   accumulator = iterator.call(context, accumulator, value, key, list)
  // }
  var len = keys.length

  while (++i < len) {
    var key = keys[i]
    var value = list[key]

    accumulator = iterator.call(context, accumulator, value, key, list)
  }

  return accumulator
}

module.exports = reduce
