// get object size

function size (obj) {
  var count = 0
  var key

  for (key in obj) {
    if (obj.hasOwnProperty(key)) count++
  }

  return count
}

module.exports = size
