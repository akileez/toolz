var reduce = require('./reduce')

// IMPORTANT: duplicates are removed starting from end of array.
// and no custom compare function as in ./unique.js

function uniq (arr) {
  return reduce(arr, function (prev, curr) {
    if (prev.indexOf(curr) === -1) prev.push(curr)
    return prev
  }, [])
}

module.exports = uniq
