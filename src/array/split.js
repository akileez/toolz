// Splits an array into a fixed number of segments.

// The number of segments is specified by segments and defaults to 2.
// If the array cannot be evenly split, the first segments will contain the extra items.
// If arr is empty, an empty array is returned.
// If arr.length is less than segments, then the resulting array
// will have arr.length number of single-element arrays.

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
