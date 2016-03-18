function xconcat () {
  var len = arguments.length
  var i = -1
  var target = []

  while (++i < len) {
    target[i] = arguments[i]
  }

  return target
}

module.exports = xconcat
