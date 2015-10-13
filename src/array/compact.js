// Returns a new Array without any null or undefined values.
// Note that it will keep empty strings and other falsy values

var filter = require('./filter')

function compact (arr) {
  return filter(arr, function (value) {
    return (value != null)
  })
}

module.exports = compact
