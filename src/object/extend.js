function extend (target) {
  var hasOwn = Object.prototype.hasOwnProperty
  var arg
  var key
  var len = arguments.length
  var i = 0

  while (++i < len) {
    arg = arguments[i]
    if (!arg) continue

    for (key in arg) {
      // istanbul ignore else
      if (hasOwn.call(arg, key)) target[key] = arg[key]
    }
  }

  return target
}

module.exports = extend
