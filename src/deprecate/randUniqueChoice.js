var randUnique = require('./randUnique')
var isArray = require('../lang/isArray')

// returns a random element from the supplied arguments
// or from the array (if single argument is an array)
// Useful for things like slideshows where you don't want to have the same slide twice in a row

function choice (items) {
  var target = (arguments.length === 1 && isArray(items)) ? items : arguments
  return target[randUnique(0, target.length - 1)]
}

module.exports = choice
