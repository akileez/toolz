var capitalize = require('./case-capitalize')
var camelize = require('./case-camelize')
var stringify = require('./stringify')

function classify (str) {
  str = stringify(str)
  return capitalize(camelize(str.replace(/[\W_]/g, ' ')).replace(/\s/g, ''))
}

module.exports = classify
