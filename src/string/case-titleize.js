var stringify = require('./stringify')
var normalize = require('./case-normalize')

// underscore.string titleize.js

function titleize (str) {
  return stringify(str)
    .toLowerCase()
    .replace(/(?:^|\s|-)\S/g, function (c) {
    return c.toUpperCase()
  })
}

module.exports = titleize
