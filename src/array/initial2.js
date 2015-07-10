var filter = require('./filter')

function initial (arr) {
  filter(arr, function (val, key, arr) {
    return (key < arr.length - 1)
  })
}

module.exports = initial