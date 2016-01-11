// glob-path-regex <https://github.com/regexps/glob-path-regex>
// Copyright (c) 2014-2015 Jon Schlinkert. (MIT)

module.exports = function globPathRegex () {
  return /^(.*?)(([\w*]*|[.\\*]*\{[^}]*\})((\.([\w*]*))*))$/
}
