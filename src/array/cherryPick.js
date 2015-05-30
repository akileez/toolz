var toArray = require('../lang/toArray')

function cherryPick () {
  var args = toArray(arguments)
  var arrayOfObjects = args.shift()
  var properties = args
  if (!Array.isArray(arrayOfObjects)) throw new Error("cherryPick() input must be an array")

  return arrayOfObjects
    .filter(function(obj) {
      return properties.some(function(prop) {
        return obj[prop] !== undefined
      })
    })
    .map(function(obj) {
      var output = {}
      properties.forEach(function(prop) {
        if (obj[prop] !== undefined) output[prop] = obj[prop]
      })
      return output
    })
}

module.exports = cherryPick