function dasher (str) {
  return str
    .replace(/([A-Z])/g, '-$1')
    .replace(/[-_\s]+/g, '-')
    .replace(/^-/g, '')
    .toLowerCase()
}

module.exports = dasher
