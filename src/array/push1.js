// fast implementation of push. no checks
// push one item, hence push1

function push1 (arr, item) {
  arr[arr.length] = item

  return arr.length
}

module.exports = push1