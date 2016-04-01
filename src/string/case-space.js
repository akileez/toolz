var toNoCase = require('./case-none')

// ianstormtaylor/to-space-case
// convert a 'string' to space case

function toSpaceCase (str) {
  return toNoCase(str).replace(/[\W_]+(.|$)/g, function (matches, match) {
    return match ? ' ' + match : ''
  })
}

module.exports = toSpaceCase
