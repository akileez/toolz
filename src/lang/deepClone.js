var kindOf        = require('./kindOf')
var clone         = require('./clone')
var isPlainObject = require('./isPlainObject')
var forOwn        = require('../object/forOwn')

function deepClone (value, instanceClone) {
  switch (kindOf(value)) {
    case 'object' : return cloneDeepObject(value, instanceClone)
    case 'array'  : return cloneDeepArray(value, instanceClone)
    default       : return clone(value)
  }
}

function cloneDeepObject (source, instanceClone) {
  if (isPlainObject(source)) {
    var out = {}
    forOwn(source, function (value, key) {
      this[key] = deepClone(value, instanceClone)
    }, out)
    return out
  } else if (instanceClone) {
    return instanceClone(source)
  } else {
    return source
  }
}

function cloneDeepArray (arr, instanceClone) {
  var out = []
  var i = -1
  var n = arr.length
  while (++i < n) {
    out[i] = deepClone(arr[i], instanceClone)
  }
  return out
}

module.exports = deepClone
