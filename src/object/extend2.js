function extend (target) {
  var arg
  var key
  var len = arguments.length
  var i = 0

  while (++i < len) {
    arg = arguments[i]
    if (!arg) continue

    Object.keys(arg).forEach(function (key) {
      // testing ... removed hasOwnProperty check. Don't think its needed
      target[key] = arg[key]
    })
  }
  return target
}

module.exports = extend
