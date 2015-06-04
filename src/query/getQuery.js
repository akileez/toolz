// gets full query as string with all special chars decoded

function getQuery (url) {
  url = url.replace(/#.*/, '')
   //valid chars according to: http://www.ietf.org/rfc/rfc1738.txt
  var queryString = /\?[a-zA-Z0-9\=\&\%\$\-\_\.\+\!\*\'\(\)\,]+/.exec(url)
  return (queryString) ? decodeURIComponent(queryString[0]) : ''
}

module.exports = getQuery
