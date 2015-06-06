// underscore.string lines.js

function lines (str) {
  if (str == null) return []
  return String(str).split(/\r?\n/)
}

module.exports = lines
