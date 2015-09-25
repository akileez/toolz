var forOwn = require('./forOwn')

// get object vales

function values (obj) {
  var vals = []
  forOwn(obj, function (val, key) {
    vals.push(val)
  })
  return vals
}

module.exports = values
