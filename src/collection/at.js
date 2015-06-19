var baseAt = require('../base/baseAt')
var baseFlatten = require('../base/baseFlatten')
var rest = require('../function/rest')

var at = rest(function (collection, props) {
  return baseAt(collection, baseFlatten(props))
})

module.exports = at
