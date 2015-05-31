var identity = require('../function/identity')
var forEach = require('./forEach')

function groupBy (arr, categorize, thisObj) {
  if (categorize) categorize = makeIterator(categorize, thisObj)
  else categorize = identity

  var buckets = {}
  forEach(arr, function(element) {
    var bucket = categorize(element)
    if (!bucket in buckets) buckets[bucket] = []

    buckets[bucket].push(element)
  })
  return buckets
}

module.exports = groupBy
