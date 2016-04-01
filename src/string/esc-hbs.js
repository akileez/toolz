var toString = require('../lang/toString')

function escapeHandlebars (str) {
  str = toString(str)
    .replace(/\(/g, '&#40;')
    .replace(/\)/g, '&#41;')
    .replace(/\{/g, '&#123;')
    .replace(/\}/g, '&#125;')
  return str
}

module.exports = escapeHandlebars
