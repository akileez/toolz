var stringify = require('./stringify')

function replaceAll (str, find, replace, ignorecase) {
  var flags = (ignorecase === true) ? 'gi' : 'g'
  var regx  = new RegExp(find, flags)

  return stringify(str).replace(regx, replace)
}

module.exports = replaceAll
