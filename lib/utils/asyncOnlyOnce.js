function only_once (fn) {
  return function () {
    if (fn === null) throw new Error("callback was already called.")
    fn.apply(this, arguments)
    fn = null
  }
}

module.exports = only_once
