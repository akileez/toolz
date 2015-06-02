// round value up with custom radix

function ceil (val, step) {
  step = Math.abs(step || 1)
  return Math.ceil(val / step) * step
}

module.exports = ceil
