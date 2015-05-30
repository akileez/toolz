var createObject = require('./createObject')

function inheritPrototype (child, parent) {
  var p = createObject(parent.prototype)
  p.constructor = child
  child.prototype = p
  child.super_ = parent
  return p
}

module.exports = inheritPrototype
