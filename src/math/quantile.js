// * Calculate the kth q-quantile of a set of numbers in an array.
// * As per http://en.wikipedia.org/wiki/Quantile#Quantiles_of_a_population
// * Ex: Median is 1st 2-quantile
// * Ex: Upper quartile is 3rd 4-quantile

// * @param {Array} set of values.
// * @param {Number} index of quantile.
// * @param {Number} number of quantiles.
// * @return {Number} kth q-quantile of values.

function quantile (arr, k, q) {
  var sorted
  var count
  var idx

  if (k === 0) return Math.min.apply(null, arr)
  if (k === q) return Math.max.apply(null, arr)

  sorted = arr.slice(0)
  sorted.sort(function (a, b) {
    return a - b
  })
  count = sorted.length
  idx = count * k / q

  if (idx % 1 === 0) return 0.5 * sorted[idx - 1] + 0.5 * sorted[idx]

  return sorted[Math.floor(idx)]
}

module.exports = quantile
