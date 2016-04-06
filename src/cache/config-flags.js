var stampit  = require('../object/stamp')
var toFlags  = require('../string/to-flags')
var keys = require('../object/keys')

module.exports = stampit()
  .methods({
    toArgs: flags
  })

function flags (keyz) {
  keyz = keyz || keys(this.config)
  return toFlags(this.config, keyz)
}
