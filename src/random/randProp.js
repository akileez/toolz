var random = require('./random')
// from Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com) - random-obj-prop

function randProp (obj) {
  var keys = Object.keys(obj)
  return obj[keys[Math.floor(random() * keys.length)]]
}

module.exports = randProp
