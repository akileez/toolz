var typecast = require('../string/typecast')
var getQuery = require('./getQuery')

// get query parameter value

function getParam (url, param, shouldTypecast) {
  var regexp = new RegExp('(\\?|&)'+ param + '=([^&]*)') // matches `?param=value` or `&param=value`, value = $2
  var result = regexp.exec(getQuery(url))
  var val = (result && result[2]) ? result[2] : null

  return shouldTypecast === false ? val : typecast(val)
}

module.exports = getParam
