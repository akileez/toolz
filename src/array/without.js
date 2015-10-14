var toArray = require('../lang/toArray')
var testval = require('../lang/testval')
var filter  = require('./filter')

function without (arr, removeItems) {
  removeItems = toArray(removeItems) // check this for a string of args

  return filter(arr, function (item) {
    return !testval(item, removeItems)
  })
}

module.exports = without
