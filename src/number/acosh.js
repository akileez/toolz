function acosh (x) {
  return Math.log(x + Math.sqrt(x * x - 1))
}

module.exports = acosh
