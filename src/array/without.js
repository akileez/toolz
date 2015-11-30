var convert = require('./convert')
var filter  = require('./filter')
var testval = require('../lang/testval')

function without (arr, removeItems) {
  removeItems = convert.toArray(removeItems)

  return filter(arr, function (item) {
    return !testval(item, removeItems)
  })
}

module.exports = without
