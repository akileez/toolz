// like omit but with the ability to use an object
// array or strings.

var kindOf  = require('../lang/kind').objs
var slice   = require('../array/slice')
var extend  = require('../object/extend')
var keys    = require('../object/keys')

function without (obj, props) {
  switch (kindOf(props)) {
    case 'object' :
      props = keys(props)
      break
    case 'array' :
      // props = props
      break
    case 'string' :
      props = slice(arguments, 1)
      break
  }

  var output = extend({}, obj)
  var i = -1
  var len = props.length

  while (++i < len) {
    delete output[props[i]]
  }

  return output
}

module.exports = without
