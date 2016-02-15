var stampit  = require('../object/stampit')
var api      = require('../factory/api-chain')

// stampit(methods, state, enclose);
module.exports = stampit()
  // enclose
  .initializers([
    function () {
      api.create(this)
    }
  ])


