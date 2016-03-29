// immutable extending

function extend () {
  var arg
  var key
  var len = arguments.length
  var i = -1
  var target = {}

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
