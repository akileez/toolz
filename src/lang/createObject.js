var mixIn = require('../object/mixIn')

function createObject (parent, props) {
  function F () {}
  F.prototype = parent
  return mixIn(new F(), props)
}

module.exports = createObject
