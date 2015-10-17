// Extract a list of property values

var map = require('./map')
var prop = require('../function/prop')

function pluck (arr, name) {
  return map(arr, prop(name))
}

module.exports = pluck
