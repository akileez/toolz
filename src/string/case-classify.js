var capitalize = require('./case-capitalize')
var camelize   = require('./case-camelize')
var stringify  = require('./stringify')

function classify (str) {
  return capitalize(camelize(stringify(str).replace(/[\W_]/g, ' ')).replace(/\s/g, ''))
}

module.exports = classify
