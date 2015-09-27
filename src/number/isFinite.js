function isFinite (num) {
  return typeof num === 'number'
    && num === num
    && num !== Infinity
    && num !== -Infinity
}

module.exports = isFinite
