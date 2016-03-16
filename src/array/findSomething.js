// adopted from: pick [array-tools] <https://github.com/75lb/array-tools#module_array-tools.pick>
// Copyright (c) 2015-16 Lloyd Brookes <75pound@gmail.com> (MIT)

var get     = require('../object/get')
var map     = require('./map')
var some    = require('./some')
var filter  = require('./filter')
var forEach = require('./forEach')
var convert = require('./convert')

/*
  return a copy of the input [records] containing objects
  having only the cherry-picked properties
    data = [
      { name: "Dana", age: 30 },
      { name: "Yana", age: 20 },
      { name: "Zhana", age: 10 }
    ]

    log(pick(data, 'name'))
    log(pick(data, ['name', 'age']))

    data2 = [
      { person: { name: "Dana", age: 30 }},
      { person: { name: "Yana", age: 20 }},
      { person: { name: "Zhana", age: 10 }}
    ]

    log(pick(data2, 'person.name'))

*/

function pick (records, props) {
  records = convert(records)
  props = convert(props)

  return map(filter(records, (obj) => {
    return some(props, (prop) => {
      return get(obj, prop) !== undefined
    })
  }), (obj) => {
    var output = {}
    forEach(props, (prop) => {
      var val = get(obj, prop)
      var last = prop.split('.').pop()
      if (val) output[last] = val
    })

    return output
  })
}

module.exports = pick
