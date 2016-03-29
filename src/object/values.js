var hasOwn = require('./hasOwn')

function values (obj) {
  var result = []
  var key

  for (key in obj) {
    if (hasOwn(obj, key)) {
      result.push(obj[key])
    }
  }
  return result
}

module.exports = values
