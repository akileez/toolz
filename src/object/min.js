var arrMin = require('../array/min')
var values = require('./values')

// returns minimum value inside object.

function min (obj, iterator) {
  return arrMin(values(obj), iterator)
}

module.exports = min
