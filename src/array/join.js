var filter = require('./filter')

function join (items, separator) {
  separator = separator || ''
  return filter(items, isValidString).join(separator)
}

function isValidString (value) {
  return (value != null && value != '')
}

module.exports = join