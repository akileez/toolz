// can be achieved with the following:
// values(obj).forEach(callback)

function foreach (obj, fn) {
  var key

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn(obj[key], key, obj)
    }
  }
}

module.exports = foreach
