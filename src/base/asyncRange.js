var _map =  require('./asyncMap')

function _range (count) {
  return _map(Array(count), function (v, i) {
    return i
  })
}

module.exports = _range
