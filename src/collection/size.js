var objSize = require('../object/size')
var isIteger = require('../lang/isIteger')

// get collection size

function size (list) {
  if (!list) return 0
  if (isIteger(list.length)) return list.length
  return objSize(list)
}

module.exports = size
