var functions = require('./functions')
var bind      = require('../function/bind')
var forEach   = require('../array/forEach')
var slice     = require('../array/slice')

function bindAll (obj, rest_methodNames) {
  var keys = arguments.length > 1
    ? slice(arguments, 1)
    : functions(obj)

  forEach(keys, function (key) {
    obj[key] = bind(obj[key], obj)
  })
}

module.exports = bindAll
