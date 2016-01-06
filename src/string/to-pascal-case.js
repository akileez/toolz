var toSpaceCase = require('./to-space-case')

// convert a 'string' to pascal case

function toPascalCase (str) {
  return toSpaceCase(str).replace(/(?:^|\s)(\w)/g, function (matches, letter) {
    return letter.toUpperCase()
  })
}

module.exports = toPascalCase

/*
    var pascal = require('to-pascal-case');

    pascal('space case'); // "SpaceCase"
    pascal('snake_case'); // "SnakeCase"
    pascal('dot.case');   // "DotCase"
    pascal('weird[case'); // "WeirdCase"
 */
