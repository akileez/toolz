var stringify = require('./stringify')

function swapCase (str) {
  return stringify(str).replace(/\S/g, (c) => {
    return c === c.toUpperCase()
      ? c.toLowerCase()
      : c.toUpperCase()
  })
}

module.exports = swapCase
