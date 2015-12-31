// updates own properties of a target object from multiple sources

function defaults (target) {
  var arg
  var key
  var len = arguments.length
  var i = 0

  while (++i < len) {
    arg = arguments[i]
    if (!arg) continue

    for (key in target) {
      if (target.hasOwnProperty(key)) {
        if (arg[key]) target[key] = arg[key]
      }
    }
  }
  return target
}

module.exports = defaults
