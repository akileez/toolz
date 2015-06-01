var toString = require('../lang/toString')

function unhyphenate (str) {
  str = toString(str)
  return str.replace(/(\w)(-)(\w)/g, '$1 $3')
}

module.exports = unhyphenate