var stampit  = require('../stamp/stampit')
var Emitter  = require('../util/Emitter')

module.exports = stampit()
  .initializers([
    function () {
      Emitter(this)
    }
  ])
  // .convertConstructor(Emitter)