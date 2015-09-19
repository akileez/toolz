function add (arr) {
  return arr.reduce(function (sum, item, key) {
    return sum += item
  })
}

module.exports = add
