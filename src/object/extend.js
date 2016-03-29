function extend (target) {
  var arg
  var key
  var len = arguments.length
  var i = 0

  while (++i < len) {
    arg = arguments[i]
    if (!arg) continue

    for (key in arg) {
      // istanbul ignore else
      if (arg.hasOwnProperty(key)) target[key] = arg[key]
    }
  }

  return target
}

module.exports = extend
