function only_once (fn) {
  var called = false
  return function () {
    if (called) throw new Error("callback was already called.")
    called = true
    fn.apply(this, arguments)
  }
}

module.exports = only_once
