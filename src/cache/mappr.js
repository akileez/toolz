var stampit  = require('../object/stampit')
var set      = require('../object/set')
var get      = require('../object/get')
var has      = require('../object/has')

// stampit(methods, state, enclose);
module.exports = stampit()
  // methods
  .methods({
    set : setter,
    get : getter,
    has : hasit,
    del : removeit
  })
  // enclose
  .initializers([
    function () {
      this.cache = {}
    }
  ])


// sets 'value' to 'key' of the cache
function setter (key, value) {
  set(this.cache, key, value)
  if (this.emit) this.emit('set', key, value)
  return this
}

// gets the cached value for 'key' or entire cache
function getter (key) {
  return key ? get(this.cache, key) : this.cache
}

// checks if a cached value for 'key exists'
function hasit (key) {
  if (key.indexOf('.') === -1) return this.cache.hasOwnProperty(key)
  return has(this.cache, key)
}

// remove 'keys' from the cache. if no value specified, the entire cache is reset
function removeit (key) {
  if (this.has(key)) {
    delete this.cache[key]
    if (this.emit) this.emit('del', key)
  }

  return this
}
