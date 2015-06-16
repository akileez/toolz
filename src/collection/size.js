var objSize = require('../object/size')
var isInteger = require('../lang/isInteger')

// get collection size

function size (list) {
  if (!list) return 0
  if (isInteger(list.length)) return list.length
  return objSize(list)
}

module.exports = size
