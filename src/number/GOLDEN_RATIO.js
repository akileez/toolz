// 0.6180339887498949
// module.exports = (Math.sqrt(5) - 1) / 2

function phi () {
  return (Math.sqrt(5) + 1) / 2
}

function mean () {
 return (Math.sqrt(5) - 1) / 2
}

function ratio () {
  return 1 - mean()
}

exports.phi = phi
exports.mean = mean
exports.ratio = ratio
