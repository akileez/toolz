var look = require('./look')

function has (obj, prop) {
  return look(obj, prop) !== undefined
}

module.exports = has
