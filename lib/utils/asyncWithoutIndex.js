function _withoutIndex (iterator) {
  return function (value, index, callback) {
    return iterator(value, callback)
  }
}

module.exports = _withoutIndex
