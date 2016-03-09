// adopted from: sort-array <https://github.com/75lb/sort-array>
// Copyright (c) 2015 Lloyd Brookes <75pound@gmail.com> (MIT)

// sort an array of objects by any number of fields, in any order
// this function assumes a flat object structure for the items
// in the array.

var rest = require('../function/rest')
var kindOf = require('../lang/kindOf')

function sortBy (data) {
  return rest(function (args) {
    if (kindOf(args[args.length - 1]) === 'object') {
      var customOrder = args.pop()
    }

    var columns = [].concat(args)
    return data.sort(sortByFunc(columns, customOrder))
  })

  function sortByFunc (properties, customOrder) {
    var props = properties.slice(0)
    var property = props.shift()

    return function tryIt (a, b) {
      var result
      var x = a[property]
      var y = b[property]

      if (typeof x === 'undefined' && typeof y !== 'undefined') result = -1
      else if (typeof x !== 'undefined' && typeof y === 'undefined') result = 1
      else if (typeof x === 'undefined' && typeof y === 'undefined') result = 0
      else if (customOrder && customOrder[property]) {
        result = customOrder[property].indexOf(x) - customOrder[property].indexOf(y)
      } else {
        result = x < y ? -1 : x > y ? 1 : 0
      }

      if (result === 0) {
        if (props.length) {
          property = props.shift()
          return tryIt(a, b)
        } else {
          return 0
        }
      } else {
        props = properties.slice(0)
        property = props.shift()
        return result
      }
    }
  }
}

module.exports = sortBy
