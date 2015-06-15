var _arrayEach = require('./asyncArrayEach')

function _forEachOf (obj, iterator) {
  _arrayEach(keys(obj), function (key) {
    iterator(obj[key], key)
  })
}

module.exports = _forEachOf
