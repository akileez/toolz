// can be achieved with the following:
// values(obj).forEach(callback)

function foreach (obj, cb) {
  Object.keys(obj).forEach(function (key) {
    cb(obj[key], key)
  })
}

module.exports = foreach
