var forOwn = require('./forOwn')

// checks if a object contains all given properties/values

function matches (target, props) {
  // can't use object/every because of circular dependency
  var result = true
  forOwn(props, function (val, key) {
    if (target[key] !== val) return (result = false) // break loop at first instance
  })
  return result
}

module.exports = matches
