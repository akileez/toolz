var mean = require('./mean')
var median = require('./median')
var mode = require('./mode')
var quantile = require('./quantile')
var stdDev = require('./standardDev')
var scrub = require('./scrub')

function report (arr) {
  arr = scrub(arr)
  return {
    mean: mean(arr),
    firstQuartile: quantile(arr, 1, 4),
    median: median(arr),
    thirdQuartile: quantile(arr, 3, 4),
    standardDev: stdDev(arr),
    mode: mode(arr),
    population: arr.length
  }
}

module.exports = report
