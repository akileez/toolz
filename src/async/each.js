var eachOf = require('./eachOf')
var _withoutIndex = require('../utils/asyncWithoutIndex')

function each (arr, iterator, callback) {
  return eachOf(arr, _withoutIndex(iterator), callback)
}

module.exports = each
