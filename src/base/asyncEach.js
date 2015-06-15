function _each (coll, iterator) {
  return isArrayLike(coll)
    ? _arrayEach(coll, iterator)
    : _forEachOf(coll, iterator)
}

module.exports = _each