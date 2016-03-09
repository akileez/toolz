function xconcat () {
  var arg
  var len = arguments.length
  var i = -1
  var target = []

  while (++i < len) {
    arg = arguments[i]
    if (!arg) continue

    target[i] = arg
  }

  return target
}

module.exports = xconcat
