// a dupe of collection/contains.js although not as eloquent. will develop
// this version further for strings and/or functions then build
// a comprehensive make function.

var kindOf      = require('../lang/kindOf')
var objContains = require('../object/contains')
var arrContains = require('../array/contains')
var reContains  = require('../regex/contains')

function matches (obj, val) {
  var test = kindOf(obj)
  if (test === 'array') return arrContains(obj, val)
  if (test === 'regexp') return reContains(obj, val)
  if (test === 'object') return objContains(obj, val)
}

module.exports = matches
