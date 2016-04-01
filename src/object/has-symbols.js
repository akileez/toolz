function hasSymbols (obj) {
  return (Object.getOwnPropertySymbols(obj).length > 0)
}

module.exports = hasSymbols