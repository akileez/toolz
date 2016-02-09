var stampit  = require('../object/stampit')

module.exports = stampit()
  .initializers([
    function () {
      this.pending = 0
      this.max = Infinity
      this.listeners = []
      this.waiting = []
      this.error = null
    }
  ])
  .methods({
    go: go,
    wait: wait,
    hold: hold
  })

function go (fn) {
  if (this.pending < this.max) {
    pendGo(this, fn)
  } else {
    this.waiting.push(fn)
  }
}

function wait (cb) {
  if (this.pending === 0) {
    cb(this.error)
  } else {
    this.listeners.push(cb)
  }
}

function hold () {
  return pendHold(this)
}

function pendHold(self) {
  self.pending += 1
  var called = false
  return onCb

  function onCb(err) {
    if (called) throw new Error("callback called twice")
    called = true
    self.error = self.error || err
    self.pending -= 1
    if (self.waiting.length > 0 && self.pending < self.max) {
      pendGo(self, self.waiting.shift())
    } else if (self.pending === 0) {
      var listeners = self.listeners
      self.listeners = []
      listeners.forEach(cbListener)
    }
  }
  function cbListener(listener) {
    listener(self.error)
  }
}

function pendGo(self, fn) {
  fn(pendHold(self))
}

