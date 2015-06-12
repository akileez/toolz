// mout.js
var filter = require('./filter')

function compact (arr) {
  return filter(arr, function(value) {
    return (value != null)
  })
}

module.exports = compact
