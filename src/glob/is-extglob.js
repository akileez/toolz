function isExtglob (str) {
  return typeof str === 'string' && /[@?!+*]\(/.test(str)
}

module.exports = isExtglob
