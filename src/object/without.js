// like omit but with the ability to use an object
// array or strings.

var kindOf  = require('../lang/kindOf')
var clone   = require('../lang/clone')
var slice   = require('../array/slice')
var forEach = require('../array/forEach')
var keys    = require('../object/keys')

function without (obj, props) {
  switch (kindOf(props)) {
    case 'object' :
      props = keys(props)
      break
    case 'array' :
      props = props
      break
    case 'string' :
      props = slice(arguments, 1)
      break
  }

  var output = clone(obj)

  forEach(props, function (omit) {
    delete output[omit]
  })

  return output
}

module.exports = without
