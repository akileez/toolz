var stringify = require('./stringify')

// replaces hyphens with spaces (only hyphens between word chars)

function unhyphenate (str) {
  return stringify(str).replace(/(\w)(-)(\w)/g, '$1 $3')
}

module.exports = unhyphenate
