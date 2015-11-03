var objKeys = require('./foreach')

function reduce (obj, memo, fn) {
  objKeys(obj, function (prop, key, obj) {
    memo = fn(memo, prop, key, obj)
  })
  return memo
}

module.exports = reduce
