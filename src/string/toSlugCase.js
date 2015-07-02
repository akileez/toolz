var toSpaceCase = require('./toSpaceCase')

// convert a 'string' to slug case

function toSlugCase (str) {
  return toSpaceCase(str).replace(/\s/g, '-')
}

module.exports = toSlugCase


/*
    var slug = require('to-slug-case');

    slug('camelCase');  // "camel-case"
    slug('space case'); // "snake-case"
    slug('dot.case');   // "dot-case"
    slug('weird[case'); // "weird-case"
 */
