// get the values from an array of objects
function values (arr, prop) {
  var result = []
  var len = arr.length

  var i = -1
  var j = -1

  while (++i < len) {
    var obj = arr[i]
    if (obj.hasOwnProperty(prop)) result[++j] = arr[i][prop]
  }

  return result
}

module.exports = values
