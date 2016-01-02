var stamp  = require('../object/stampit')

module.exports = stamp.methods({
  reset: function (key) {
      this.del(key)
      this.set(key, {})
      return this
    }
})
