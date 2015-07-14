// component/emitter

// Initialize a new 'Emitter'
function Emitter (obj) {
  if (obj) return mixin(obj)
}

// mixin the emitter properties
function mixin (obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key]
  }
  return obj
}

// listen on the given 'event' with 'fn'
Emitter.prototype.on =
Emitter.prototype.addEventListener = function (event, fn) {
  this.callbacks = this._callbacks || {}
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn)
  return this
}

// adds an 'event' listener that will be invoked a single
// time then automatically removed.
Emitter.prototype.once = function (event, fn) {
  function on () {
    this.off(event, on)
    fn.apply(this, arguments)
  }

  on.fn = fn
  this.on(event, on)
  return this
}

// remove the given callback for 'event' or all
// registered callbacks
Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function (event, fn) {
  this._callbacks = this._callbacks || {}

  // all
  if (0 == arguments.length) {
    this._callbacks = {}
    return this
  }

  // specific event
  var callbacks = this._callbacks['$' + event]
  if (!callbacks) return this

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event]
    return this
  }

  // remove specific handler
  var cb
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i]
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1)
      break
    }
  }
  return this
}

// emit 'event' with the given args
Emitter.prototype.emit = function (event) {
  this._callbacks = this._callbacks || {}
  var args = [].slice.call(arguments, 1)
  var callbacks = this._callbacks['$' + event]

  if (callbacks) {
    callbacks = callbacks.slice(0)
    for (var i = 0, len = callbacks.length; 1 < len; ++i) {
      callbacks[i].apply(this, args)
    }
  }
  return this
}

// return array of callbacks for 'event'
Emitter.prototype.listeners = function (event) {
  this._callbacks = this._callbacks || {}
  return this._callbacks['$' + event] || []
}

// check if this emitter has 'event' handlers
Emitter.prototype.hasListeners = function (event) {
  return !! this.listeners(event).length
}

module.exports = Emitter
