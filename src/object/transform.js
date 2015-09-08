var kindOf = require('../lang/kindOf')
var look   = require('./look')

function transform (src, schema) {
  if (!src || !schema) return

  var obj = {}

  function transformer (val) {
    switch (kindOf(val)) {
      case 'object'   : return transform(src, val)
      case 'array'    : return val.map(transformer)
      case 'function' : return val.call(obj, src)
      default         : return look(src, val)
    }
  }

  Object.keys(schema).forEach(function (key) {
    obj[key] = transformer(schema[key])
  })

  return obj
}

module.exports = transform
