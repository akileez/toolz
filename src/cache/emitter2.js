var stampit  = require('../stamp/_stampit')
var Emitter  = require('../util/Emitter')

module.exports = stampit()
  .init([
    function () {
      Emitter(this)
    }
  ])
