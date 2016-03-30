// replication of Object.keys(obj).forEach()

// I had been doing forEach(keys(obj), function (prop, key, obj) {
//  something done here.
// })

// can also be achieved with the following:
// keys(obj).forEach(callback), or using values: values(obj).forEach(cb)

function foreach (obj, fn) {
  var hasOwn = Object.prototype.hasOwnProperty
  var key

  for (key in obj) {
    if (hasOwn.call(obj, key)) {
      fn(obj[key], key, obj)
    }
  }
}

module.exports = foreach
