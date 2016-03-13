var make = require('./_make_new')
var arrContains = require('../array/contains')
var objContains = require('../object/contains')
var strContains = require('../string/contains')
var rexContains = require('../regex/contains')

module.exports = make(arrContains, objContains, strContains, rexContains)
module.exports.arr = arrContains
module.exports.obj = objContains
module.exports.str = strContains
module.exports.rex = rexContains
