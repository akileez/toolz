// in lieu of the spread operator until I upgrade
// to ES6 !!NOT TESTED!!
var slice = require('./slice')
var map = require('../object/map')
var foreach = require('../object/foreach')

function from () {
  return map(slice(arguments), function (val) {
    var res = []
    foreach(val, function (prop) {
      return res.push(prop)
    })
    return res
  })['0']
}

module.exports = from
