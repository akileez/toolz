var reduce = require('./reduce')
var push = require('./push')

function uniq (arr) {
  return reduce(arr, function (prev, curr) {
    if (prev.indexOf(curr) === -1) push(prev, curr)
    return prev
  }, [])
}

module.exports = uniq
