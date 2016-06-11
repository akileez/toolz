var uniqr = require('./randUnique')

function uniqArrItem(arr) {
  var rand = uniqr(0, arr.length -1)

  return () => arr[rand()]
}

module.exports = uniqArrItem
