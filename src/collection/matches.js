// a dupe of collection/contains.js although not as eloquent. will develop
// this version further for strings and/or functions then build
// a comprehensive make function.

var isPlainObject = require('../lang/isPlainObject')
var objContains = require('../object/contains')
var arrContains = require('../array/contains')
var reContains = require('../regex/contains')
var isRegExp = require('../lang/isRegExp')

function matches (obj, val) {
  if (Array.isArray(obj)) return arrContains(obj, val)
  if (isRegExp(obj)) return reContains(obj, val)
  if (isPlainObject(obj)) return objContains(obj, val)
}

module.exports = matches
