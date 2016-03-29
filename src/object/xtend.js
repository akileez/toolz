// immutable extending

function extend () {
  var hasOwn = Object.prototype.hasOwnProperty
  var arg
  var key
  var len = arguments.length
  var i = -1
  var target = {}

  while (++i < len) {
    arg = arguments[i]
    if (!arg) continue

    for (key in arg) {
      if (hasOwn.call(arg, key)) target[key] = arg[key]
    }
  }

  return target
}

module.exports = extend
