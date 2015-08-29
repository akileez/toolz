var some = require('./some')

function contains (obj, needle) {
  return some(obj, function (value) {
    return (value === needle)
  })
}

module.exports = contains
