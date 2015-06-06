// for taking argument object (string) and passing to npm for installs (as an array)

function makeArray (str) {
  return str.toLowerCase().replace(/\,/g, '').split(' ')
}

module.exports = makeArray
