var _arrayEach = require('./asyncArrayEach')
var _keys = require('./asyncKeys')

function _forEachOf (obj, iterator) {
  _arrayEach(_keys(obj), function (key) {
    iterator(obj[key], key)
  })
}

module.exports = _forEachOf
