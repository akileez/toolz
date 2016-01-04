var stamp  = require('../object/stampit')
var jlog = require('../util/jcolorz')

module.exports = stamp.methods({
  reset: function (key) {
    if (this.has(key)) this.del(key)
    this.set(key, {})
    if (this.emit) this.emit('set', key, 'reset')
    return this
  },
  getStamp: function getStamp () {
    jlog(this)
  }
})
