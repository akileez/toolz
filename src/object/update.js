var forOwn = require('./forOwn')

// updates own properties of a target object from multiple sources

function defaults (target) {
  var arg
  var len = arguments.length
  var i = 0

  while (++i < len) {
    arg = arguments[i]
    // istanbul ignore if
    if (!arg) continue

    forOwn(target, function (val, key) {
      if (arg[key]) target[key] = arg[key]
    })
  }
  return target
}

module.exports = defaults
