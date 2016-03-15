// adopted from: sort-array <https://github.com/75lb/sort-array>
// Copyright (c) 2015 Lloyd Brookes <75pound@gmail.com> (MIT)

// sort an array of objects by any number of fields, in any order
// this function assumes a flat object structure for the items
// in the array.

var sort    = require('./sort')
var convert = require('./convert')
var isUndef = require('../lang/isUndefined')
var get     = require('../object/get')

function sortBy (records, columns, order) {
  return sort(records, sortByFunc(convert(columns), order))
}

function sortByFunc (properties, order) {
  var props = properties.slice(0)
  var property = props.shift()

  return function sorter (a, b) {
    var result
    var x = get(a, property)
    var y = get(b, property)

    if (isUndef(x) && !isUndef(y)) result = -1
    else if (!isUndef(x) && isUndef(y)) result = 1
    else if (isUndef(x) && isUndef(y)) result = 0
    else if (order && order[property]) {
      result = order[property].indexOf(x) - order[property].indexOf(y)
    } else {
      result = x < y ? -1 : x > y ? 1 : 0
    }

    if (result === 0) {
      if (props.length) {
        property = props.shift()
        return sorter(a, b)
      } else {
        props = properties.slice(0)
        property = props.shift()
        return 0
      }
    } else {
      props = properties.slice(0)
      property = props.shift()
      return result
    }
  }
}

module.exports = sortBy
