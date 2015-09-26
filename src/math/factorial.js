// efficient implementation of a factorial

function factorial (x) {
  if (x < 2) return 1
  else return factorial(x - 1) * x
}

module.exports = factorial
