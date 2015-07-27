var slice = require('../array/slice')
var some = require('../array/some')

function isOr (value) {
  var args = slice(arguments, 1, arguments.length)

  return some(args, function (val) {
    return (value === val)
  })
}

module.exports = isOr
