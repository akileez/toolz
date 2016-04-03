// test whether a string is camel-case
var hasSpace = /\s/
var hasSeparator = /[\W_]/
var hasCamel = /([a-z][A-Z]|[A-Z][a-z])/
// separator splitter
var separatorSplitter = /[\W_]+(.|$)/g
// camelcase splitter
var camelSpitter = /(.)([A-Z]+)/g

// remove any starting case from a 'string', like camel or snake, but keep
// spaces and punctuation that may be important otherwise
function toNoCase (str) {
  if (hasSpace.test(str)) return str.toLowerCase()
  if (hasSeparator.test(str)) return (unseparate(str) || str).toLowerCase()
  if (hasCamel.test(str)) return uncamelize(str).toLowerCase()
  return str.toLowerCase()
}

// un-separate a 'string'
function unseparate (str) {
  return str.replace(separatorSplitter, function (m, next) {
    return next ? ' ' + next : ''
  })
}

// un-camelize a 'string'
function uncamelize (str) {
  return str.replace(camelSpitter, function (m, previous, uppers) {
    return previous + ' ' + uppers.toLowerCase().split('').join(' ')
  })
}

module.exports = toNoCase

/*
    var clean = require('to-no-case');

    clean('camelCase');       // "camel case"
    clean('snake_case');      // "snake case"
    clean('slug-case');       // "slug case"
    clean('Title of Case');   // "title of case"
    clean('Sentence case.');  // "sentence case."
*/
