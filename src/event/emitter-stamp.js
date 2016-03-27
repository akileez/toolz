var stampit  = require('../object/stamp')
var Emitter  = require('./Emitter')

module.exports = stampit()
  .initializers([
    function () {
      Emitter(this)
    },
    function () {
      Emitter.call(this)
    }
  ])
