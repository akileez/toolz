var toString = require('../lang/toString')

// underscore.string titleize.js

function titleize (str) {
  return toString(str).toLowerCase().replace(/(?:^|\s|-)\S/g, function (c) {
    return c.toUpperCase()
  })
}

module.exports = titleize
