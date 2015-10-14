// regular expression for escaping unprintable ansi escape sequences

var ansiEscape = /\u001b.*?m/g

module.exports = ansiEscape
