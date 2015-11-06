var kindOf        = require('./kind').objs
var isPlainObject = require('./isPlainObject')
var extend        = require('../object/extend')

function clone (value) {
  switch (kindOf(value)) {
    case 'object' : return cloneObject(value)
    case 'array'  : return cloneArray(value)
    case 'regexp' : return cloneRegExp(value)
    case 'date'   : return cloneDate(value)
    default       : return value
  }
}

function cloneObject (src) {
  if (isPlainObject(src)) return extend({}, src)
  else return src
}

function cloneRegExp (r) {
  var flags = ''
  flags += r.multiline ? 'm' : ''
  flags += r.global ? 'g' : ''
  flags += r.ignoreCase ? 'i' : ''
  return new RegExp(r.source, flags)
}

function cloneDate (date) {
  return new Date(+date)
}

function cloneArray (arr) {
  return arr.slice()
}

module.exports = clone
