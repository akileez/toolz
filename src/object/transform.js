// adopted from: https://github.com/djelic/node-object-utils (MIT)

var kindOf  = require('toolz/src/lang/kindOf')
var look    = require('toolz/src/object/look')
var keys    = require('toolz/src/object/keys')
var forEach = require('toolz/src/array/forEach')
var map     = require('toolz/src/array/map')

function transform (src, schema) {
  if (!src || !schema) return

  var obj = {}

  function transformer (val) {
    switch (kindOf(val)) {
      case 'object'   : return transform(src, val)
      case 'array'    : return map(val, transformer)
      case 'function' : return val.call(obj, src)
      default         : return look(src, val)
    }
  }

  forEach(keys(schema), function (key) {
    obj[key] = transformer(schema[key])
  })

  return obj
}

module.exports = transform
