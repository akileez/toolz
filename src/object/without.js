// like omit but with the ability to use an object
// array or strings.

var kindOf = require('../lang/kindOf')
var clone  = require('../lang/clone')
var slice  = require('../array/sliced')

function without (obj, props) {
  switch (kindOf(props)) {
    case 'object' :
      props = Object.keys(props)
      break
    case 'array' :
      props = props
      break
    case 'string' :
      props = slice(arguments, 1)
      break
  }

  var output = clone(obj)
  props.forEach(function (omit) {
    delete output[omit]
  })

  return output
}

module.exports = without
