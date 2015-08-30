// split array into a fixed number of segments

function split (arr, segments) {
  segments = segments || 2
  var results = []
  if (arr == null) return results

  var minLength = Math.floor(arr.length / segments)
  var remainder = arr.length % segments
  var i = 0
  var len = arr.length
  var segmentIndex = 0
  var segmentLength

  while (i < len) {
    segmentLength = minLength
    if (segmentIndex < remainder) segmentLength++

    results.push(arr.slice(i, i + segmentLength))
    segmentIndex++
    i += segmentLength
  }
  return results
}

module.exports = split
