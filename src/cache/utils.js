var stamp  = require('../object/stamp')

module.exports = stamp.methods({
  // reset keys on the cache property
  reset: function (key) {
    if (this.has(key)) this.del(key)
    this.set(key, {})
    if (this.emit) this.emit('set', key, 'reset')
    return this
  },
  // look up any enumerable property on a given factory function
  look: function (key) {
    return this[key]
  }
})
