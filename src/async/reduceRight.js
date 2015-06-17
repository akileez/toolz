var reduce = require('./reduce')
var map = require('../utils/asyncMap')

function reduceRight (arr, memo, iterator, callback) {
  var reversed = _map(arr, function (x) {
    return x
  }).reverse()
  reduce(reversed, memo, iterator, callback)
}

module.exports = reduceRight
