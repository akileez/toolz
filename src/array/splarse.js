// adopted from: https://github.com/keis/sparse-splice

// original implementation:
// module.exports = function sparseSplice(arr, remove) {
//   remove.sort().reverse().forEach(function (idx) {
//     arr.splice(idx, 1)
//   })
// }

var isArray = require('../lang/isArray')
var slice   = require('./slice')
var forEach = require('./forEach')
var sort    = require('./sort')

function sparseSplice (arr, remove) {
  remove = isArray(remove) ? remove : slice(arguments, 1)

  forEach(sort(remove, function (a, b) {
    return b - a // reverse sort
  }), function (idx) {
    arr.splice(idx, 1)
  })

  return arr
}

module.exports = sparseSplice
