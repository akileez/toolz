var toNoCase = require('./to-no-case')

// convert a 'string' to capital case

function toCapitalCase (str) {
  return toNoCase(str).replace(/(^|\s)(\w)/g, function (matches, previous, letter) {
    return previous + letter.toUpperCase()
  })
}

module.exports = toCapitalCase

/*
    var capital = require('to-capital-case');

    capital('camelCase');       // "Camel Case"
    capital('space case');      // "Space Case"
    capital('snake_case');      // "Snake Case"
    capital('dot.case');        // "Dot Case"
    capital('some*weird[case'); // "Some Weird Case"
*/
