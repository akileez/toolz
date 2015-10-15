var make = require('./_make')
var arrContains = require('../array/contains')
var objContains = require('../object/contains')
var strContains = require('../string/contains')
var rexContains = require('../regex/contains')

module.exports = make(arrContains, objContains, strContains, rexContains)
