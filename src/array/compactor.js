// Returns a new Array with all falsey values removed.
// The values `false`, `null`, `0`, `""`, `undefined`, and `NaN` are falsey.

var filter = require('./filter')

function compact (arr) {
  return filter(arr, function (value) {
    return (value)
  })
}

module.exports = compact
