var _arrayEach = require('./asyncArrayEach')

function _reduce (arr, iterator, memo) {
  _arrayEach(arr, function (x, i, a) {
    memo = iterator(memo, x, i, a)
  })
  return memo
}

module.exports = _reduce
