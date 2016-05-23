// quick and dirty version of case-hyphenate for
// when no other dependencies are wanted.

function dasher (str) {
  return String(str)
    .replace(/([A-Z])/g, '-$1')
    .replace(/[-_\s]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase()
}

module.exports = dasher
