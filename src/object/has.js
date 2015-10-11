var get = require('./get')

function has (obj, prop) {
  return get(obj, prop) !== undefined
}

module.exports = has
