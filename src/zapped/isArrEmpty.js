var slice = require('../array/slice')

function isEmpty () {
  var args = slice(arguments)
  return args.every(function (val) {
    return !val.length
  })
}

module.exports = isEmpty
