var isExtglob = require('./is-extglob')

function isGlob (str) {
  return typeof str === 'string'
    && (/[*!?{}(|)[\]]/.test(str)
    || isExtglob(str))
}

module.exports = isGlob
