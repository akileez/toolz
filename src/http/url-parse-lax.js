
var url = require('url')
var prependHttp = require('./prepend-http')

'use strict'

module.exports = function (x) {
  var withProtocol = prependHttp(x)
  var parsed = url.parse(withProtocol)

  if (withProtocol !== x) {
    parsed.protocol = null
  }

  return parsed
}
