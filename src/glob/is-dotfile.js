// str.charCodeAt(0) === 46 is the '.' character
function isDotFile (str) {
  if (str.charCodeAt(0) === 46 && str.indexOf('/', 1) === -1) return true

  var last = str.lastIndexOf('/')
  return last !== -1 ? str.charCodeAt(last + 1) === 46 : false
}

module.exports = isDotFile
