function extend (target) {
  var arg
  var key
  var len = arguments.length
  var i = 0

  if (len === 1) {
    arg = target
    target = {}

    for (key in arg) {
      if (arg.hasOwnProperty(key)) target[key] = arg[key]
    }

    return target
  }

  while (++i < len) {
    arg = arguments[i]
    if (!arg) continue

    for (key in arg) {
      if (arg.hasOwnProperty(key)) target[key] = arg[key]
    }
  }

  return target
}

module.exports = extend