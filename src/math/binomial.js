function binomial (n, k) {
  var a = []

  function binome (n, k) {
    if (n >= 0 && k === 0) return 1
    if (n === 0 && k > 0) return 0
    if (a[n] && a[n][k] > 0) return a[n][k]
    if (!a[n]) a[n] = []

    a[n][k] = binome(n - 1, k - 1) + binome(n - 1, k)
    return a[n][k]
  }

  return binome(n, k)
}

module.exports = binomial
