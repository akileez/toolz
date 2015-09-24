// Evaluate the correlation amongst a set of values

var covariance = require('./covariance')
var std = require('./standardDev')

function correlation (arrX, arrY) {
  if (arrX.length === arrY.length) {
    var covarXY = covariance(arrX, arrY)
    var stdDevX = std(arrX)
    var stdDevY = std(arrY)

    return covarXY / (stdDevX * stdDevY)
  } else {
    throw new Error('Array mismatch')
  }
}

module.exports = correlation
