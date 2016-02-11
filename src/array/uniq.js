var reduce = require('./reduce')

function uniq (arr) {
  return reduce(arr, function (prev, curr) {
    if (prev.indexOf(curr) === -1) prev.push(curr)
    return prev
  }, [])
}

module.exports = uniq
