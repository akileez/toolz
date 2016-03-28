var extend = require('../object/extend')

function createObject (parent, props) {
  function F () {}
  F.prototype = parent
  return extend(new F(), parent, props)
}

module.exports = createObject
