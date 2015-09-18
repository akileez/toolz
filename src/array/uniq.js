function uniq (arr) {
  return arr.reduce(function (prev, curr) {
    if (prev.indexOf(curr) === -1) prev.push(curr)
    return prev
  }, [])
}

module.exports = uniq
