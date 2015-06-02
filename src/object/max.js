var arrMax = require('../array/max')
var values = require('./values')

// returns maximum value inside object

function max (obj, iterator) {
  return arrMax(values(obj), iterator)
}

module.exports = max
