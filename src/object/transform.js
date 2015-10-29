// adopted from: https://github.com/djelic/node-object-utils (MIT)

var kindOf  = require('../lang/kindOf')
var get     = require('../object/get')
var keys    = require('../object/keys')
var forEach = require('../array/forEach')
var map     = require('../array/map')

function transform (src, schema) {
  if (!src || !schema) return

  var obj = {}

  function transformer (val) {
    switch (kindOf(val)) {
      case 'object'   : return transform(src, val)
      case 'array'    : return map(val, transformer)
      case 'function' : return val.call(obj, src)
      default         : return get(src, val)
    }
  }

  forEach(keys(schema), function (key) {
    obj[key] = transformer(schema[key])
  })

  return obj
}

module.exports = transform
