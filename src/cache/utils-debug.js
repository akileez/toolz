var stamp  = require('../object/stampit')
var jlog = require('../util/jcolorz')

// debugging toolz

module.exports = stamp.methods({
  getStamp: function getStamp () {
    jlog(this)
  },
  log: function log (output) {
    jlog(output)
  },
  view: function chk (name) {
    jlog(this[name])
  }
})
