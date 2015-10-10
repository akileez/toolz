// regular expression for escaping unprintable ansi escape sequences

function ansiEscape () {
  return /\u001b.*?m/g
}

module.exports = ansiEscape
