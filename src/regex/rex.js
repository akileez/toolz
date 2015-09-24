function replace (re, replacement, str) {
  return str.replace(re, replacement)
}

function contains (re, str) {
  return re.test(str)
}

function matches (re, str) {
  return str.match(re)
}

exports.replace = replace
exports.contains = contains
exports.matches = matches
// exports.exec = exec
