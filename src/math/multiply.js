function times (arr) {
  return arr.reduce(function (prod, item, key) {
    if (key === 0) return prod = item
    return prod *= item
  })
}

module.exports = times
