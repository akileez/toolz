var random = require('./random')
// sindresorhus/random-obj-key Licensed MIT

function randKeys (obj) {
  var keys = Object.keys(obj)
  return keys[Math.floor(random() * keys.length)]
}

module.exports = randKeys
