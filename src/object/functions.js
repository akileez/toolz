// return a list of all enummerable properties that have function values

function functions (obj) {
  var result = []
  var key

  for (key in obj) {
    if (typeof key === 'function') result.push(key)
  }

  return result.sort()
}

module.exports = functions
