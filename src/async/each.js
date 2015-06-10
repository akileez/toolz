var eachOf = require('./eachOf')
var _withoutIndex = require('../base/_withoutIndex')

function each (arr, iterator, callback) {
  return eachOf(arr, _withoutIndex(iterator), callback)
}

module.exports = each
