// tester function to compare [].prototype.push against an iterator assignment

function keys (obj) {
  var result = []
  var key
  var j = -1

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[++j] = key
    }
  }
  return result
}

module.exports = keys
