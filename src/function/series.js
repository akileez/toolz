function series () {
  var fns = arguments
  return function () {
    var i = 0
    var n = fns.length
    while (i < n) {
      fns[i].apply(this, arguments)
      i += 1
    }
  }
}

module.exports = series
