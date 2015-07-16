function _once (fn) {
  return function () {
    if (fn === null) return
    fn.apply(this, arguments)
    fn = null
  }
}

module.exports = _once
