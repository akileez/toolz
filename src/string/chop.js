// underscore.string chop

function chop (str, n) {
  if (str == null) return []
  str = String(str)
  n = ~~n

  return n > 0
    ? str.match(new RegExp(`.{1,${n}}`, 'g'))
    : [str]
}

module.exports = chop
