function forEachChar (str, fn) {
  var i = -1
  var len = str.length

  while (++i < len) {
    fn(str.charAt(i), i, str)
  }
}

module.exports = forEachChar
