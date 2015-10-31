// checks if `value` is object-like

function isObjectLike (value) {
  return !!value && typeof value === 'object'
}

module.exports = isObjectLike
