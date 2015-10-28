// really basic version with no checks or conversions.
// raw version for testing purposes.

function repeat (str, n) {
  var res = ''
  var i = -1

  while (++i < n) {
    res += str
  }

  return res
}

module.exports =  repeat
