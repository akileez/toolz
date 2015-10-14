// in lieu of the spread operator until I upgrade
// to ES6 !!NOT TESTED!!
var slice = require('./sliced')

function from (args) {
  args = slice(arguments)
  return args
}

module.exports = from
