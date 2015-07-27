var slice = require('../array/slice')
var every = require('../array/every')

function isNot (value) {
  var args = slice(arguments, 1, arguments.length)

  return every(args, function (val) {
    return (value !== val)
  })
}

module.exports = isNot