function baseRandom (min, max) {
  min = min == null ? MIN_INT : min
  max = max == null ? MAX_INT : max
  return min + Math.floor(Math.random() * (max - min + 1))
}

module.exports = baseRandom