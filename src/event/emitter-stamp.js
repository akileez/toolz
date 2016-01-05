var stampit  = require('../object/stampit')
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
