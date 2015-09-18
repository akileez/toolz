var toArray = require('../lang/toArray')
var testval = require('../lang/testval')

function without (arr, removeItems) {
  removeItems = toArray(removeItems) // check this for a string of args
  return arr.filter(function (item) {
    return !testval(item, removeItems)
  })
}

module.exports = without
