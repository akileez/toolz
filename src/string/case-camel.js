var toSpaceCase = require('./case-space')

// convert a 'string' to camel case

function toCamelCase (str) {
  return toSpaceCase(str).replace(/\s(\w)/g, function (matches, letter) {
    return letter.toUpperCase()
  })
}

module.exports = toCamelCase

/*
    var camel = require('to-camel-case');

    camel('space case'); // "spaceCase"
    camel('snake_case'); // "snakeCase"
    camel('dot.case');   // "dotCase"
    camel('weird[case'); // "weirdCase"
 */
