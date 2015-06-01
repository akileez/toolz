var toString = require('../lang/toString')

function escapeHtml (str) {
  str = toString(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;')
  return str
}

module.exports = escapeHtml
