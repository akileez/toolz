var toArray = require('../lang/toArray')

// was cherryPick. changed to array/pick and moved previous file
// to array/pickRandRemove

function pick () {
  var args = toArray(arguments)
  var arrayOfObjects = args.shift()
  var properties = args
  if (!Array.isArray(arrayOfObjects)) throw new Error('pick() input must be an array')

  return arrayOfObjects
    .filter(function (obj) {
      return properties.some(function (prop) {
        return obj[prop] !== undefined
      })
    })
    .map(function (obj) {
      var output = {}
      properties.forEach(function (prop) {
        if (obj[prop] !== undefined) output[prop] = obj[prop]
      })
      return output
    })
}

module.exports = pick
