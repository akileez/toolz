function _once (fn) {
  var called = false
  return function () {
    if (called) return
    called = true
    fn.apply(this, arguments)
  }
}

module.exports = _once
