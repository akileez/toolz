var stampit  = require('../object/_stampit')
var Emitter  = require('./Emitter')

module.exports = stampit()
  .init([
    function () {
      Emitter(this)
      Emitter.call(this)
    }
  ])
