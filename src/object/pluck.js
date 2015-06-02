var map = require('./map')
var prop = require('../function/prop')

// extract a list of property values

function pluck (obj, propName) {
  return map(obj, prop(propName))
}

module.exports = pluck
